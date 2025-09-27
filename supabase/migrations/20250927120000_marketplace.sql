-- Enable needed extension for UUIDs
create extension if not exists "pgcrypto";

-- Marketplace Listings
create table if not exists public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text not null check (category in ('Crops','Plants','Foods')),
  expiry_date date,
  freshness text,
  image_url text,
  price numeric not null check (price >= 0),
  unit text default 'piece',
  quantity integer default 1 check (quantity >= 0),
  sold_quantity integer default 0 check (sold_quantity >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.marketplace_listings enable row level security;

create policy "Listings are viewable by authenticated users" on public.marketplace_listings
  for select using (auth.role() = 'authenticated');

create policy "Users can insert own listings" on public.marketplace_listings
  for insert with check (auth.uid() = user_id);

create policy "Users can update own listings" on public.marketplace_listings
  for update using (auth.uid() = user_id);

create policy "Users can delete own listings" on public.marketplace_listings
  for delete using (auth.uid() = user_id);

-- Costs table to hide cost price from other users
create table if not exists public.marketplace_listing_costs (
  listing_id uuid primary key references public.marketplace_listings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  cost_price numeric not null check (cost_price >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint listing_costs_owner_match check (user_id is not null)
);

alter table public.marketplace_listing_costs enable row level security;

create policy "Owner can select own listing costs" on public.marketplace_listing_costs
  for select using (auth.uid() = user_id);

create policy "Owner can insert own listing costs" on public.marketplace_listing_costs
  for insert with check (auth.uid() = user_id);

create policy "Owner can update own listing costs" on public.marketplace_listing_costs
  for update using (auth.uid() = user_id);

create policy "Owner can delete own listing costs" on public.marketplace_listing_costs
  for delete using (auth.uid() = user_id);

-- Reviews table
create table if not exists public.marketplace_reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.marketplace_listings(id) on delete cascade,
  reviewer_user_id uuid not null references auth.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.marketplace_reviews enable row level security;

create policy "Reviews are viewable by authenticated users" on public.marketplace_reviews
  for select using (auth.role() = 'authenticated');

create policy "Authenticated users can add reviews" on public.marketplace_reviews
  for insert with check (auth.role() = 'authenticated' and auth.uid() = reviewer_user_id);

create policy "Reviewers can update their reviews" on public.marketplace_reviews
  for update using (auth.uid() = reviewer_user_id);

create policy "Reviewers can delete their reviews" on public.marketplace_reviews
  for delete using (auth.uid() = reviewer_user_id);
