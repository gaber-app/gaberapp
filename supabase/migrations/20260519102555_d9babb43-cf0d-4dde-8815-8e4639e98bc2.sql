-- Fix permissive rate limits policy
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.subscription_rate_limits;

CREATE POLICY "Deny direct writes to rate limits"
ON public.subscription_rate_limits
AS RESTRICTIVE
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);

-- Remove anon INSERT on subscriptions (edge function uses service role and bypasses RLS)
DROP POLICY IF EXISTS "Anyone can submit subscription form" ON public.subscriptions;

-- Revoke EXECUTE on SECURITY DEFINER helper functions from public roles
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, PUBLIC;
-- has_role is used by RLS policies which run as the policy evaluator; keep authenticated execute for now
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;