-- Drop the overly permissive UPDATE policy
DROP POLICY IF EXISTS "Wallet owners can update their registration" ON public.community_registrations;

-- Replace with a policy that denies all updates
CREATE POLICY "No updates allowed"
ON public.community_registrations
FOR UPDATE
USING (false);