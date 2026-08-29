alter table public.temoignages
  add column if not exists titre_en text,
  add column if not exists titre_ru text,
  add column if not exists citation_africain_en text,
  add column if not exists citation_africain_ru text,
  add column if not exists citation_russe_en text,
  add column if not exists citation_russe_ru text;
