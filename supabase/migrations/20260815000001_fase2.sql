-- ============================================================
-- Fase 2 — split adultos/crianças em leads, visto em travelers
-- ============================================================

alter table leads drop column group_size;
alter table leads add column adults int not null default 1;
alter table leads add column children int not null default 0;

alter table travelers add column visa_expiry date;
