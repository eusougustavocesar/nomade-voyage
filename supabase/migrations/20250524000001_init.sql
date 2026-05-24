-- ============================================================
-- Nômade Voyage — Schema inicial
-- ============================================================

-- ── Extensões ────────────────────────────────────────────────

-- ── Enums ────────────────────────────────────────────────────

create type user_role as enum ('admin', 'agent');

create type lead_stage as enum (
  'novo',
  'qualificado',
  'proposta_enviada',
  'negociacao',
  'reservado',
  'em_preparacao',
  'em_viagem',
  'concluido',
  'perdido'
);

create type contact_source as enum (
  'site',
  'whatsapp',
  'instagram',
  'facebook',
  'indicacao',
  'google',
  'outro'
);

create type product_type as enum (
  'pacote_completo',
  'pacote_personalizado',
  'voo',
  'hotel',
  'transfer',
  'seguro',
  'excursao',
  'roteiro',
  'consultoria'
);

create type booking_status as enum (
  'rascunho',
  'confirmado',
  'pago',
  'em_viagem',
  'concluido',
  'cancelado',
  'reembolsado'
);

create type payment_status as enum (
  'pendente',
  'pago',
  'atrasado',
  'cancelado',
  'reembolsado'
);

create type quote_status as enum (
  'rascunho',
  'enviado',
  'aceito',
  'recusado',
  'expirado'
);

create type activity_type as enum (
  'mensagem',
  'ligacao',
  'whatsapp',
  'email',
  'nota',
  'mudanca_stage',
  'proposta',
  'reserva'
);

create type post_status as enum ('rascunho', 'publicado', 'arquivado');

create type flight_class as enum ('economica', 'premium_economy', 'executiva', 'primeira');

create type board_type as enum ('sem_refeicao', 'cafe_manha', 'meia_pensao', 'pensao_completa', 'all_inclusive');

create type transfer_type as enum ('aeroporto_hotel', 'hotel_aeroporto', 'inter_cidades', 'privativo', 'compartilhado');

create type item_status as enum ('pendente', 'confirmado', 'cancelado');

-- ============================================================
-- USUÁRIOS E CONTATOS
-- ============================================================

-- Perfis internos (staff da agência)
create table profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text not null,
  email       text not null unique,
  phone       text,
  avatar_url  text,
  role        user_role not null default 'agent',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Contatos externos (leads e clientes)
create table contacts (
  id           uuid primary key default gen_random_uuid(),
  full_name    text not null,
  email        text,
  phone        text,                        -- número WhatsApp principal
  source       contact_source not null default 'site',
  tags         text[] default '{}',
  notes        text,
  assigned_to  uuid references profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index on contacts(email);
create index on contacts(phone);
create index on contacts(assigned_to);

-- ============================================================
-- PIPELINE COMERCIAL
-- ============================================================

create table leads (
  id                  uuid primary key default gen_random_uuid(),
  contact_id          uuid not null references contacts(id) on delete cascade,
  stage               lead_stage not null default 'novo',

  -- Interesse
  destination         text,
  travel_date_from    date,
  travel_date_to      date,
  duration_days       int,
  group_size          int,
  budget_min          numeric(12,2),
  budget_max          numeric(12,2),
  flexible_dates      boolean default false,
  observations        text,

  -- Gestão
  assigned_to         uuid references profiles(id) on delete set null,
  lost_reason         text,
  lost_at             timestamptz,
  won_at              timestamptz,
  estimated_value     numeric(12,2),

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index on leads(stage);
create index on leads(contact_id);
create index on leads(assigned_to);

-- Histórico de atividades do lead
create table lead_activities (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references leads(id) on delete cascade,
  type         activity_type not null,
  content      text not null,
  metadata     jsonb default '{}',          -- ex: stage anterior/novo em mudança
  created_by   uuid references profiles(id) on delete set null,
  created_at   timestamptz not null default now()
);

create index on lead_activities(lead_id);
create index on lead_activities(created_at);

-- ============================================================
-- CATÁLOGO DE PRODUTOS
-- ============================================================

create table products (
  id               uuid primary key default gen_random_uuid(),
  type             product_type not null,
  name             text not null,
  description      text,
  base_price       numeric(12,2),
  commission_rate  numeric(5,4) default 0,   -- ex: 0.1200 = 12%
  currency         char(3) not null default 'BRL',
  is_active        boolean not null default true,
  metadata         jsonb default '{}',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index on products(type);
create index on products(is_active);

-- Pacotes estruturados (espelha / substituirá o arquivo packages.ts)
create table packages (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid references products(id) on delete set null,
  slug          text not null unique,
  name          text not null,
  tagline       text,
  destination   text not null,
  countries     text[] not null default '{}',
  cities        text[] not null default '{}',
  duration_days int not null,
  photo_url     text,
  badge         text,
  profile_text  text,
  price_from    numeric(12,2),
  max_group     int,
  highlights    text[] default '{}',
  includes      text[] default '{}',
  not_includes  text[] default '{}',
  itinerary     jsonb default '[]',          -- array de { day, title, description, ... }
  is_active     boolean not null default true,
  is_popular    boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index on packages(slug);
create index on packages(is_popular);

-- ============================================================
-- PROPOSTAS (QUOTES)
-- ============================================================

create table quotes (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references leads(id) on delete cascade,
  status       quote_status not null default 'rascunho',
  valid_until  date,
  message      text,
  total        numeric(12,2) not null default 0,
  created_by   uuid references profiles(id) on delete set null,
  sent_at      timestamptz,
  accepted_at  timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index on quotes(lead_id);
create index on quotes(status);

create table quote_items (
  id           uuid primary key default gen_random_uuid(),
  quote_id     uuid not null references quotes(id) on delete cascade,
  product_id   uuid references products(id) on delete set null,
  product_type product_type not null,
  description  text not null,
  quantity     int not null default 1,
  unit_price   numeric(12,2) not null,
  total_price  numeric(12,2) generated always as (quantity * unit_price) stored,
  sort_order   int not null default 0
);

create index on quote_items(quote_id);

-- ============================================================
-- RESERVAS (BOOKINGS)
-- ============================================================

create table bookings (
  id               uuid primary key default gen_random_uuid(),
  lead_id          uuid references leads(id) on delete set null,
  contact_id       uuid not null references contacts(id) on delete restrict,
  quote_id         uuid references quotes(id) on delete set null,
  status           booking_status not null default 'confirmado',
  reference        text unique,              -- ex: NV-2025-0042
  travel_date_from date,
  travel_date_to   date,
  group_size       int not null default 1,
  total_price      numeric(12,2) not null,
  amount_paid      numeric(12,2) not null default 0,
  notes            text,
  created_by       uuid references profiles(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index on bookings(contact_id);
create index on bookings(status);
create index on bookings(reference);

-- Itens da reserva (cada serviço contratado)
create table booking_items (
  id           uuid primary key default gen_random_uuid(),
  booking_id   uuid not null references bookings(id) on delete cascade,
  product_type product_type not null,
  description  text not null,
  quantity     int not null default 1,
  unit_price   numeric(12,2) not null,
  total_price  numeric(12,2) generated always as (quantity * unit_price) stored,
  status       item_status not null default 'pendente',
  sort_order   int not null default 0
);

create index on booking_items(booking_id);
create index on booking_items(product_type);

-- ── Detalhes por tipo de produto ─────────────────────────────

-- Voos
create table booking_flights (
  id                  uuid primary key default gen_random_uuid(),
  booking_item_id     uuid not null unique references booking_items(id) on delete cascade,
  airline             text not null,
  flight_number       text,
  pnr                 text,                  -- Passenger Name Record
  departure_airport   text not null,
  arrival_airport     text not null,
  departure_at        timestamptz not null,
  arrival_at          timestamptz not null,
  class               flight_class not null default 'economica',
  baggage_allowance   text,
  is_return_leg       boolean not null default false,
  confirmation_code   text
);

-- Hotéis
create table booking_hotels (
  id                uuid primary key default gen_random_uuid(),
  booking_item_id   uuid not null unique references booking_items(id) on delete cascade,
  hotel_name        text not null,
  address           text,
  city              text not null,
  country           text not null,
  stars             int check (stars between 1 and 5),
  room_type         text,
  board             board_type not null default 'cafe_manha',
  check_in          date not null,
  check_out         date not null,
  nights            int generated always as (check_out - check_in) stored,
  confirmation_code text,
  supplier_ref      text
);

-- Transfers
create table booking_transfers (
  id                uuid primary key default gen_random_uuid(),
  booking_item_id   uuid not null unique references booking_items(id) on delete cascade,
  type              transfer_type not null,
  pickup_location   text not null,
  dropoff_location  text not null,
  pickup_at         timestamptz not null,
  vehicle_type      text,
  passengers        int not null default 1,
  flight_ref        text,                    -- voo de referência para sincronizar horário
  confirmation_code text,
  supplier          text
);

-- Seguros
create table booking_insurance (
  id                uuid primary key default gen_random_uuid(),
  booking_item_id   uuid not null unique references booking_items(id) on delete cascade,
  provider          text not null,
  plan_name         text,
  policy_number     text,
  valid_from        date not null,
  valid_to          date not null,
  coverage_amount   numeric(12,2),
  coverage_currency char(3) default 'USD',
  beneficiaries     int not null default 1,
  coverage_details  jsonb default '{}'       -- coberturas específicas
);

-- Excursões e passeios
create table booking_tours (
  id                uuid primary key default gen_random_uuid(),
  booking_item_id   uuid not null unique references booking_items(id) on delete cascade,
  tour_name         text not null,
  operator          text,
  city              text not null,
  starts_at         timestamptz not null,
  duration_hours    numeric(5,1),
  meeting_point     text,
  language          text default 'Português',
  participants      int not null default 1,
  confirmation_code text,
  includes          text[] default '{}',
  notes             text
);

-- Roteiros (serviço de planejamento)
create table booking_itineraries (
  id                uuid primary key default gen_random_uuid(),
  booking_item_id   uuid not null unique references booking_items(id) on delete cascade,
  destination       text not null,
  duration_days     int not null,
  travel_style      text,                    -- ex: cultural, aventura, gastronomia
  days              jsonb default '[]',      -- array de { day, title, description, accommodation, meals }
  notes             text,
  delivered_at      timestamptz
);

-- ============================================================
-- VIAJANTES
-- ============================================================

create table travelers (
  id               uuid primary key default gen_random_uuid(),
  booking_id       uuid not null references bookings(id) on delete cascade,
  full_name        text not null,
  email            text,
  phone            text,
  document_type    text default 'passaporte',
  document_number  text,
  document_expiry  date,
  nationality      text default 'Brasileira',
  date_of_birth    date,
  is_lead_traveler boolean not null default false,  -- quem fez a reserva
  notes            text
);

create index on travelers(booking_id);

-- ============================================================
-- PAGAMENTOS
-- ============================================================

create table payments (
  id             uuid primary key default gen_random_uuid(),
  booking_id     uuid not null references bookings(id) on delete cascade,
  amount         numeric(12,2) not null,
  currency       char(3) not null default 'BRL',
  method         text,                       -- pix, cartao, boleto, ted
  installments   int not null default 1,
  status         payment_status not null default 'pendente',
  due_date       date,
  paid_at        timestamptz,
  receipt_url    text,
  notes          text,
  created_at     timestamptz not null default now()
);

create index on payments(booking_id);
create index on payments(status);
create index on payments(due_date);

-- ============================================================
-- BLOG
-- ============================================================

create table blog_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz not null default now()
);

create table blog_tags (
  id   uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table blog_posts (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  excerpt          text,
  content          text,                     -- markdown
  cover_image_url  text,
  status           post_status not null default 'rascunho',
  author_id        uuid references profiles(id) on delete set null,
  category_id      uuid references blog_categories(id) on delete set null,
  related_package  uuid references packages(id) on delete set null,

  -- SEO
  meta_title       text,
  meta_description text,
  og_image_url     text,

  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index on blog_posts(slug);
create index on blog_posts(status);
create index on blog_posts(published_at desc);
create index on blog_posts(category_id);

create table blog_post_tags (
  post_id uuid not null references blog_posts(id) on delete cascade,
  tag_id  uuid not null references blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- ============================================================
-- TRIGGERS — updated_at automático
-- ============================================================

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at      before update on profiles      for each row execute function set_updated_at();
create trigger trg_contacts_updated_at      before update on contacts      for each row execute function set_updated_at();
create trigger trg_leads_updated_at         before update on leads         for each row execute function set_updated_at();
create trigger trg_products_updated_at      before update on products      for each row execute function set_updated_at();
create trigger trg_packages_updated_at      before update on packages      for each row execute function set_updated_at();
create trigger trg_quotes_updated_at        before update on quotes        for each row execute function set_updated_at();
create trigger trg_bookings_updated_at      before update on bookings      for each row execute function set_updated_at();
create trigger trg_blog_posts_updated_at    before update on blog_posts    for each row execute function set_updated_at();

-- ============================================================
-- RLS — Row Level Security
-- ============================================================

alter table profiles           enable row level security;
alter table contacts           enable row level security;
alter table leads              enable row level security;
alter table lead_activities    enable row level security;
alter table products           enable row level security;
alter table packages           enable row level security;
alter table quotes             enable row level security;
alter table quote_items        enable row level security;
alter table bookings           enable row level security;
alter table booking_items      enable row level security;
alter table booking_flights    enable row level security;
alter table booking_hotels     enable row level security;
alter table booking_transfers  enable row level security;
alter table booking_insurance  enable row level security;
alter table booking_tours      enable row level security;
alter table booking_itineraries enable row level security;
alter table travelers          enable row level security;
alter table payments           enable row level security;
alter table blog_categories    enable row level security;
alter table blog_tags          enable row level security;
alter table blog_posts         enable row level security;
alter table blog_post_tags     enable row level security;

-- Helper: verifica se o usuário autenticado é staff (admin ou agent)
create or replace function is_staff()
returns boolean language sql security definer as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and is_active = true
  );
$$;

create or replace function is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- Profiles: staff lê tudo; só admin gerencia
create policy "staff lê profiles"    on profiles for select using (is_staff());
create policy "admin gerencia profiles" on profiles for all using (is_admin());

-- Contacts / Leads / Atividades: qualquer staff lê e cria; admin deleta
create policy "staff acessa contacts"    on contacts         for all using (is_staff());
create policy "staff acessa leads"       on leads            for all using (is_staff());
create policy "staff acessa atividades"  on lead_activities  for all using (is_staff());
create policy "staff acessa quotes"      on quotes           for all using (is_staff());
create policy "staff acessa quote_items" on quote_items      for all using (is_staff());
create policy "staff acessa bookings"    on bookings         for all using (is_staff());
create policy "staff acessa booking_items" on booking_items  for all using (is_staff());
create policy "staff acessa flights"     on booking_flights  for all using (is_staff());
create policy "staff acessa hotels"      on booking_hotels   for all using (is_staff());
create policy "staff acessa transfers"   on booking_transfers for all using (is_staff());
create policy "staff acessa insurance"   on booking_insurance for all using (is_staff());
create policy "staff acessa tours"       on booking_tours    for all using (is_staff());
create policy "staff acessa itineraries" on booking_itineraries for all using (is_staff());
create policy "staff acessa travelers"   on travelers        for all using (is_staff());
create policy "staff acessa payments"    on payments         for all using (is_staff());

-- Produtos e pacotes: leitura pública; escrita só staff
create policy "leitura publica products"  on products       for select using (true);
create policy "staff gerencia products"   on products       for all    using (is_staff());
create policy "leitura publica packages"  on packages       for select using (true);
create policy "staff gerencia packages"   on packages       for all    using (is_staff());

-- Blog: posts publicados são públicos; gestão é staff
create policy "leitura publica blog_categories" on blog_categories for select using (true);
create policy "staff gerencia blog_categories"  on blog_categories for all    using (is_staff());
create policy "leitura publica blog_tags"       on blog_tags       for select using (true);
create policy "staff gerencia blog_tags"        on blog_tags       for all    using (is_staff());
create policy "leitura publica posts publicados" on blog_posts
  for select using (status = 'publicado' or is_staff());
create policy "staff gerencia posts"   on blog_posts     for all using (is_staff());
create policy "leitura publica post_tags" on blog_post_tags for select using (true);
create policy "staff gerencia post_tags"  on blog_post_tags for all    using (is_staff());
