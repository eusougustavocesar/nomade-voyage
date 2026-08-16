-- ============================================================
-- Fase 4 — roteiro personalizado ligado a quote, compartilhável por token
-- ============================================================

create table quote_itineraries (
  id            uuid primary key default gen_random_uuid(),
  quote_id      uuid not null unique references quotes(id) on delete cascade,
  share_token   uuid not null default gen_random_uuid() unique,
  destination   text not null,
  duration_days int not null,
  travel_style  text,
  days          jsonb not null default '[]', -- array de { day, title, description, photo_url }
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger trg_quote_itineraries_updated_at
  before update on quote_itineraries
  for each row execute function set_updated_at();

alter table quote_itineraries enable row level security;
create policy "staff acessa quote_itineraries" on quote_itineraries for all using (is_staff());
-- Sem policy pública — acesso externo só via a função abaixo.

create or replace function get_public_itinerary(p_token uuid)
returns jsonb language sql security definer as $$
  select jsonb_build_object(
    'destination',   qi.destination,
    'duration_days', qi.duration_days,
    'travel_style',  qi.travel_style,
    'days',          qi.days,
    'quote_total',   q.total,
    'valid_until',   q.valid_until,
    'quote_status',  q.status,
    'traveler_name', c.full_name
  )
  from quote_itineraries qi
  join quotes q on q.id = qi.quote_id
  join leads l on l.id = q.lead_id
  join contacts c on c.id = l.contact_id
  where qi.share_token = p_token;
$$;
