# Specification

## Summary
**Goal:** Fix backend admin access-code authorization so the existing frontend access-code flow correctly grants admin access (and the admin dashboard no longer shows Access Denied when the correct code is used).

**Planned changes:**
- Repair/implement backend access-code initialization so `_initializeAccessControlWithSecret(adminToken)` never traps (including empty/missing/invalid tokens) and safely sets/does not set admin authorization.
- Ensure `isCallerAdmin()` is exposed on the backend canister interface as a query, always returns a boolean (never traps), and reflects the stored admin authorization state for the caller’s principal.
- Persist the authorized admin principal/state in stable storage so admin access remains intact across canister upgrades.
- Keep the current frontend admin gating UX and English messaging unchanged, without modifying immutable frontend hook files.

**User-visible outcome:** After signing in with Internet Identity, entering the correct access code (`01622610`) and reloading allows that principal to access the admin dashboard; incorrect or missing codes keep showing the existing Access Denied UI without breaking app load.
