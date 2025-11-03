-- Block anonymous access to profiles table (contains email addresses)
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles FOR SELECT 
TO anon USING (false);

-- Block anonymous access to subscriptions table (contains names and emails)
CREATE POLICY "Deny anonymous access to subscriptions"
ON public.subscriptions FOR SELECT 
TO anon USING (false);

-- Block anonymous access to user_roles table (reveals admin privileges)
CREATE POLICY "Deny anonymous access to user_roles"
ON public.user_roles FOR SELECT 
TO anon USING (false);