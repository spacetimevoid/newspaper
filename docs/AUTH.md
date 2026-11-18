# Phase 3A: single-admin authentication

## Connected project setup update

The user authorized a separate project in Wiki, Singapore, with Supabase's quoted $0/month creation cost. Created project `qcgqtuswqheaagrazbot` (Khoảng lặng), confirmed ACTIVE_HEALTHY, applied the `single_admin_allowlist` migration, and configured ignored `.env.local` using the project URL and modern publishable key. Supabase security advisors returned no findings for this setup. The existing manage2 project was not modified.

The sole admin email is `thailuongbinhfr@gmail.com`. The user reported completing account creation and Auth settings. The verified Auth user was checked through the database, and its UUID was inserted into the singleton allowlist. Account settings have not been independently inspected because connected tools have no Auth-management capability and dashboard browser access is unavailable. No password was requested or stored. Earlier sections describing unapplied/unconfigured state below are the original implementation baseline; this update supersedes them for the completed setup steps. Live login/cookie/logout tests remain pending.

## Scope and architecture

Routes: `/admin/login` and `/admin/articles` only. No registration, social login, public accounts, CRUD, editor, uploads, or deployment. The admin layout is separate from public pages and uses the existing paper palette, typography, and publication name.

Installed baseline: Next.js 16.4.6, `@supabase/ssr` 0.12.7, `@supabase/supabase-js` 2.119.0. Official guidance checked: https://supabase.com/docs/guides/auth/server-side/creating-a-client and https://supabase.com/changelog.md. No relevant SSR breaking change was found in the recent changelog; CLI v3's local/remote changes were noted. The official CLI generated the migration filename without linking a project.

Server-only SSR client factory reads cookies with Next's async cookies API. `/admin/:path*` proxy calls `getUser()` to refresh sessions and propagates cookie writes plus refresh cache headers. Protected operations independently call `requireAdmin()`; proxy refresh is not an authorization gate. `getUser()` asks Auth for a fresh server-confirmed user rather than trusting `getSession()` or editable role claims. Each guard queries the allowlist under that user's JWT; failures deny access. Do not cache identities or membership across requests. Future actions and HTTP endpoints must call the guard themselves and map denied access to an appropriate response.

Cookies are HttpOnly, SameSite=Lax, path `/`, and Secure in production. This is a server-only flow: no browser Supabase client reads tokens. Tokens stay in SSR-managed chunked cookies; no privileged keys are used. Supabase cookies must not be logged. Admin responses use private/no-store caching and pages are dynamic/noindex. Next Server Actions provide POST mutation and Origin/Host checks; do not weaken allowed origins. Public routes do not run the auth proxy.

Login uses one generic failure message for invalid credentials, non-membership, configuration issues, and infrastructure errors. Credentials are validated on server, never logged, and passwords never returned in action state. Valid credentials for a non-admin cause local signout. Redirects are restricted to the sole protected destination `/admin/articles`; arbitrary return URLs are ignored. Logout is a POST server action using local-session signout; failure is explicitly reported, not presented as success. Logout remains callable by a revoked/non-admin session so it can clear itself. It does not authorize any data access.

## Environment

Copy `.env.example` to ignored `.env.local`, then set:

- `SUPABASE_URL`: project's HTTPS URL (localhost allowed in development only).
- `SUPABASE_PUBLISHABLE_KEY`: `sb_publishable_...` key. Secret/service_role and legacy JWT keys are deliberately rejected.

These are server environment names, not `NEXT_PUBLIC_` values. Do not commit actual values. Build/public pages work without configuration; login is disabled and protected pages redirect to login. Production requires HTTPS for Secure cookies. No credentials were available during implementation, and no live project or settings were changed.

## Migration and manual bootstrap (operator only)

Prepared, NOT applied: `supabase/migrations/20261118135206_single_admin_allowlist.sql`.

The public table is RLS-enabled; `singleton` is a boolean primary key constrained to true, permitting at most one UUID. UUID references `auth.users`. Authenticated users have column-limited SELECT only and can see only their own membership; anon has no access. Application users have no write grants or policies. No RPC, endpoint, trigger, or first-user promotion grants membership.

1. Select an explicitly authorized test project first. Review the migration and apply it through your normal reviewed migration workflow. This task has not authorized production application.
2. In Supabase Auth settings, manually disable new user signups, anonymous sign-in, and unused social providers. Verify email/password sign-in is enabled. Make production changes only after separate explicit approval. No signup UI is not a substitute for disabling signup at Auth.
3. Create the intended user's email/password through the operator-only Supabase Dashboard Auth user management (or trusted server-side Admin API tooling kept outside this app). Confirm/verify the email through that trusted process, use a strong unique password, and copy the user's UUID. Do not put a password in SQL or this repository.
4. As database operator, grant the chosen UUID manually; never use an untrusted email or automatic first-user rule:

```sql
insert into public.admin_allowlist (singleton, user_id)
values (true, 'REPLACE_WITH_VERIFIED_AUTH_USER_UUID'::uuid);
```

5. To revoke, delete that UUID's row as operator. To replace the single admin, perform revocation and insertion in one operator transaction after verifying the replacement UUID. Membership revocation denies subsequent guarded requests even if an old JWT remains valid. Revoke Auth sessions as appropriate as well; already-running operations are not retroactively canceled.
6. Ensure the Data API exposes the intended schema/table; the migration grants are explicit but project exposure settings still need checking. Run Supabase security advisors and review grants/policies before use. No advisors or database checks were run here because no database is configured.

## Verification and release gates

Local results: ESLint passes, strict TypeScript passes after generated route types refreshed, and production build passes with no Supabase configuration. All 21 tests pass (11 auth policy tests and 10 existing search tests). Production HTTP verification confirms the unconfigured login state is disabled and no-store, protected articles redirect 307 to `/admin/login` without protected content (including hostile next-query input), and sampled homepage/article/topic/search routes still return 200. Browser access host remains unavailable. No live Auth, database, RLS, cookie, refresh-token, logout, CSRF, or security-advisor checks have passed yet; the checks below remain release gates. Tests retain the existing harmless Node module-type warning. Dependency installation reports 14 high-severity findings from the previously documented tooling chain; no broad audit upgrade was attempted.

`npm test` includes mock gateway tests for anonymous/expired sessions, unauthorized users (including spoofed metadata), authorized users, identity/database failures, invalid credentials, non-admin signout, logout and failure, and hostile redirects. These exercise production policy functions but do not prove Supabase behavior, SQL/RLS execution, cookie refresh, browser hydration, or CSRF enforcement.

Before integration acceptance, use an authorized test project to apply the migration, run advisors, create an admin and a non-admin, and verify:

- Anonymous `/admin/articles` redirects without private content; expired cookies refresh safely when a valid refresh token exists, otherwise deny access.
- Non-admin credentials produce the same generic login error and cannot read/modify allowlist membership or access the protected page.
- Admin login sets HttpOnly, Secure (HTTPS), SameSite=Lax cookies; protected page shows that identity. No authenticated responses are shared-cached.
- Invalid password and nonexistent email both fail generically. Password recovery is manual/outside Phase 3A.
- Logout clears local session cookies and replaying logged-out/expired sessions does not regain app access. Test a network-failed logout and verify error reporting.
- Revoking membership immediately blocks new requests, including direct future action/API calls. Two concurrent operator inserts cannot authorize two admins.
- Direct Data API attempts by anon and non-admin cannot grant membership; owner SELECT sees only its UUID. All client roles are denied mutations.
- Cross-origin action POSTs are rejected; browser back/forward does not reveal a reusable protected response; hostile redirects stay local.

Remaining operational risks: live integration and migration execution are unverified; Supabase Auth rate limits/password protection must be reviewed before exposure (no process-memory rate limiter is claimed); MFA is outside this phase. Signout revokes the local refresh session, but access JWTs can outlive signout until expiry, so keep expiry appropriate and test provider revocation behavior. Earlier public unknown-slug initial-HTML issue and lint-tooling audit findings remain open. Browser host may still be unavailable; never bypass that restriction. Stop after Phase 3A.
