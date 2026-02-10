# Specification

## Summary
**Goal:** Restore missing backend authorization modules and implement a persistent, deterministic admin/owner bootstrap so the first authenticated Internet Identity user can access the admin dashboard.

**Planned changes:**
- Add missing Motoko modules `backend/authorization/MixinAuthorization.mo` and `backend/authorization/access-control.mo` to match the import paths used by `backend/main.mo` and restore backend compilation.
- Implement access-control logic to bootstrap the first authenticated principal as the persisted owner/admin (and grant `#user` permission) when no admin exists yet.
- Persist authorization state (owner/admin and required permission mappings) in stable storage to survive canister upgrades, adding migration logic only if required by existing stable schema.
- Expose and wire backend methods required by the current frontend admin flow: `isCallerAdmin()` and `_initializeAccessControlWithSecret(adminToken)` to support first-time bootstrap and subsequent admin checks.
- Keep admin/access-denied UX text in English and avoid changes to immutable frontend hook files; only adjust non-immutable frontend files if strictly necessary to preserve the current gating behavior.

**User-visible outcome:** On a fresh deploy, the first authenticated Internet Identity user becomes admin/owner automatically and can access the admin dashboard; admin status persists across upgrades and non-admin users continue to see Access Denied.
