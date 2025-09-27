-- Create a public storage bucket for listing images
-- Run in Supabase SQL editor or via migrations

-- Create bucket if it doesn't exist
select
  case
    when exists (select 1 from storage.buckets where id = 'listing-images') then null
    else storage.create_bucket('listing-images', public := true)
  end;

-- Storage policies for the bucket
-- Public can read images in this bucket
create policy if not exists "Public read for listing-images"
  on storage.objects for select
  using (bucket_id = 'listing-images');

-- Authenticated users can upload
create policy if not exists "Authenticated can upload to listing-images"
  on storage.objects for insert
  with check (bucket_id = 'listing-images' and auth.role() = 'authenticated');

-- Owners can update/delete their own objects
create policy if not exists "Owners can update listing-images"
  on storage.objects for update
  using (bucket_id = 'listing-images' and owner = auth.uid());

create policy if not exists "Owners can delete listing-images"
  on storage.objects for delete
  using (bucket_id = 'listing-images' and owner = auth.uid());

-- Relax category constraint to allow custom categories (drop old check constraint if present)
do $$
begin
  if exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    where t.relname = 'marketplace_listings'
      and c.contype = 'c' -- check constraint
      and c.conname = 'marketplace_listings_category_check'
  ) then
    alter table public.marketplace_listings drop constraint marketplace_listings_category_check;
  end if;
end $$;
