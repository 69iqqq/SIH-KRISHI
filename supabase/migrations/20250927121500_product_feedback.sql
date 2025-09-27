-- Product reviews and comments for demo products in Buy page

create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id int not null,
  reviewer_user_id uuid not null references auth.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.product_reviews enable row level security;

create policy "Product reviews readable by authenticated" on public.product_reviews
  for select using (auth.role() = 'authenticated');

create policy "Users can insert their product reviews" on public.product_reviews
  for insert with check (auth.uid() = reviewer_user_id);

create policy "Users can update their product reviews" on public.product_reviews
  for update using (auth.uid() = reviewer_user_id);

create policy "Users can delete their product reviews" on public.product_reviews
  for delete using (auth.uid() = reviewer_user_id);

create table if not exists public.product_comments (
  id uuid primary key default gen_random_uuid(),
  product_id int not null,
  commenter_user_id uuid not null references auth.users(id) on delete cascade,
  comment text not null,
  created_at timestamptz not null default now()
);

alter table public.product_comments enable row level security;

create policy "Product comments readable by authenticated" on public.product_comments
  for select using (auth.role() = 'authenticated');

create policy "Users can insert their product comments" on public.product_comments
  for insert with check (auth.uid() = commenter_user_id);

create policy "Users can update their product comments" on public.product_comments
  for update using (auth.uid() = commenter_user_id);

create policy "Users can delete their product comments" on public.product_comments
  for delete using (auth.uid() = commenter_user_id);
