-- Add unique constraint on email to prevent duplicate submissions
ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_email_unique UNIQUE (email);

-- Create a table for rate limiting
CREATE TABLE public.subscription_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX idx_subscription_rate_limits_ip_created ON public.subscription_rate_limits (ip_address, created_at);

-- Enable RLS
ALTER TABLE public.subscription_rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from edge functions using service role
CREATE POLICY "Service role can manage rate limits"
ON public.subscription_rate_limits
FOR ALL
USING (true)
WITH CHECK (true);

-- Clean up old rate limit records (older than 1 hour) - function to be called periodically
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.subscription_rate_limits
  WHERE created_at < now() - interval '1 hour';
END;
$$;