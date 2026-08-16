-- ============================================================
-- Fase 3 — comissão a receber por item de reserva
-- ============================================================

create type commission_status as enum ('pendente', 'recebido');

alter table booking_items add column commission_rate numeric(5,4) not null default 0;
alter table booking_items add column commission_status commission_status not null default 'pendente';
alter table booking_items add column commission_received_at timestamptz;
