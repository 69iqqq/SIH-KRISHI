-- Enable realtime broadcasts for product_reviews and product_comments
-- Requires Realtime extension enabled in your project

-- Create publication if not exists
create publication if not exists supabase_realtime;

-- Add tables to publication
alter publication supabase_realtime add table if not exists public.product_reviews;
alter publication supabase_realtime add table if not exists public.product_comments;
