ALTER TABLE public.subscriptions 
ADD COLUMN consented_at timestamptz NOT NULL DEFAULT now();