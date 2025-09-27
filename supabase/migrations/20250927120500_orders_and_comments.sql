-- Orders and Comments for Marketplace

-- Orders
create table if not exists public.marketplace_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_amount numeric not null default 0,
  currency text not null default 'INR',
  status text not null default 'created', -- created, paid, canceled
  created_at timestamptz not null default now()
);

alter table public.marketplace_orders enable row level security;

create policy "Users can select their orders" on public.marketplace_orders
  for select using (auth.uid() = user_id);

create policy "Users can insert their orders" on public.marketplace_orders
  for insert with check (auth.uid() = user_id);

-- Order items
create table if not exists public.marketplace_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.marketplace_orders(id) on delete cascade,
  listing_id uuid null references public.marketplace_listings(id) on delete set null,
  title text not null,
  unit_price numeric not null,
  quantity int not null check (quantity > 0)
);

alter table public.marketplace_order_items enable row level security;

create policy "Users can select their order items" on public.marketplace_order_items
  for select using (
    exists (
      select 1 from public.marketplace_orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

create policy "Insert items via secure function only" on public.marketplace_order_items
  for insert with check (false);

-- Comments (separate from reviews)
create table if not exists public.marketplace_comments (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.marketplace_listings(id) on delete cascade,
  commenter_user_id uuid not null references auth.users(id) on delete cascade,
  comment text not null,
  created_at timestamptz not null default now()
);

alter table public.marketplace_comments enable row level security;

create policy "Comments visible to authenticated" on public.marketplace_comments
  for select using (auth.role() = 'authenticated');

create policy "Users can insert their comments" on public.marketplace_comments
  for insert with check (auth.uid() = commenter_user_id);

create policy "Users can update their comments" on public.marketplace_comments
  for update using (auth.uid() = commenter_user_id);

create policy "Users can delete their comments" on public.marketplace_comments
  for delete using (auth.uid() = commenter_user_id);

-- Secure purchase function: creates order, items and updates listing stock
create or replace function public.purchase_listings(p_items jsonb, p_currency text default 'INR')
returns uuid
language plpgsql
security definer
as $$
declare
  v_order_id uuid;
  v_total numeric := 0;
  v_uid uuid := auth.uid();
  v_item jsonb;
  v_listing record;
  v_qty int;
begin
  if v_uid is null then
    raise exception 'Not authenticated';
  end if;

  -- Create order header
  insert into public.marketplace_orders(user_id, total_amount, currency, status)
  values (v_uid, 0, coalesce(p_currency, 'INR'), 'created')
  returning id into v_order_id;

  -- Iterate items
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_qty := (v_item->>'quantity')::int;
    select * into v_listing from public.marketplace_listings where id = (v_item->>'listing_id')::uuid for update;
    if not found then
      raise exception 'Listing not found';
    end if;
    if coalesce(v_listing.quantity, 0) < v_qty then
      raise exception 'Insufficient quantity for listing %', v_listing.id;
    end if;
    -- Insert order item
    insert into public.marketplace_order_items(order_id, listing_id, title, unit_price, quantity)
    values (v_order_id, v_listing.id, v_listing.title, v_listing.price, v_qty);
    -- Update stock
    update public.marketplace_listings
      set quantity = coalesce(quantity,0) - v_qty,
          sold_quantity = coalesce(sold_quantity,0) + v_qty,
          updated_at = now()
      where id = v_listing.id;
    v_total := v_total + (v_listing.price * v_qty);
  end loop;

  update public.marketplace_orders set total_amount = v_total, status = 'paid' where id = v_order_id;
  return v_order_id;
end;
$$;

revoke all on function public.purchase_listings(jsonb, text) from public;
grant execute on function public.purchase_listings(jsonb, text) to authenticated;
