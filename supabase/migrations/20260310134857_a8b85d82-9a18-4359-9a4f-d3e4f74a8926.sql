
-- Deny all access for anon
CREATE POLICY "Deny anonymous access to rate limits"
ON public.subscription_rate_limits
AS RESTRICTIVE
FOR SELECT
TO anon
USING (false);

-- Only admins can view rate limits if needed
CREATE POLICY "Admins can view rate limits"
ON public.subscription_rate_limits
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
