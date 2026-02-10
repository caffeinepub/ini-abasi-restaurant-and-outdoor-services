# Specification

## Summary
**Goal:** Fix admin authorization bootstrap so the first Internet Identity user on a fresh deploy becomes SUPER-ADMIN/owner, prevent lockouts across canister upgrades, and improve the “Access Denied” recovery actions.

**Planned changes:**
- Update backend admin authorization logic to auto-grant SUPER-ADMIN/owner to the first Internet Identity principal only when no admins/owner exist yet, so the initial admin setup can succeed.
- Persist admin/owner authorization state in stable storage so established admins remain authorized after canister upgrades; add conditional migration handling if authorization schema/state changes.
- Enhance the frontend Access Denied screen with “Sign out” (clears Internet Identity session) and “Retry access check” (re-fetches admin status and loads dashboard if access is granted), keeping existing copy in English.

**User-visible outcome:** On a fresh deploy, the first Internet Identity user who signs in at `/admin` can access the admin dashboard; later non-admin users still see Access Denied, and admins stay authorized after upgrades with recovery actions available on the Access Denied screen.
