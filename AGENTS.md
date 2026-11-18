# Engineering rules

## Current phase and authority

- Current phase: Phase 3A, Admin Authentication, authorized by the user.
- Authorized: email/password SSR authentication, single-admin authorization, login and protected articles placeholder, logout, local SQL migration preparation, setup instructions, and tests. Preserve all public designs; stop after Phase 3A.
- Do not apply migrations or modify production auth settings without explicit approval. No article CRUD, editor, uploads, deployment, or later-phase features are authorized.
- Read `docs/PRODUCT.md`, `docs/DESIGN.md`, and `docs/ROADMAP.md` before implementation. Preserve approved decisions; report conflicts instead of silently replacing them.
- Separate confirmed requirements from proposals and unresolved questions. Do not turn an unanswered question into a requirement.
- Keep changes scoped to the requested work. Never overwrite unrelated user changes or commit secrets.

## Planned implementation standards

These rules guide later approved phases; they do not authorize implementation now.

- Use Next.js App Router, strict TypeScript, Tailwind CSS, Supabase PostgreSQL/Auth/Storage, Tiptap, and Vercel. Select versions and package manager at scaffolding time; verify current official documentation before integration.
- Prefer Server Components for public reading and data access. Use Client Components only where interaction requires them, including the editor.
- Keep domain logic and persistence access outside route presentation. Validate all untrusted inputs on the server; avoid `any` and unsafe type assertions.
- Enforce author authorization for every private read and write on the server and in database policies. A hidden route or authenticated session alone is insufficient authorization.
- Public reads must return only published articles, including topic views, search, metadata, and cached responses. Drafts must never appear in public output.
- Enable row level security on exposed tables and define explicit least privilege policies. Keep secret/service credentials server-only. Do not use editable user metadata for authorization.
- Validate and safely render editor content; disallow executable markup and unsafe link protocols. Define an explicit Tiptap document schema before persistence.
- Agree on media access rules before Storage setup; draft media must not become public unintentionally.
- Keep database changes reproducible through reviewed migrations. Do not change remote resources without authorization for that phase.
- Make Vietnamese text, diacritics, wrapping, validation, and search behavior part of verification. Store user content as Unicode.
- Follow `docs/DESIGN.md`: semantic HTML, keyboard access, visible focus, responsive layouts, restrained typography, and no decorative dashboard patterns.
- Handle loading, empty, error, unauthorized, and not-found states. Never report an unsuccessful save or publish as successful.
- Use a single chosen package manager and committed lockfile once approved. Add dependencies only for a demonstrated requirement.
- Test meaningful behavior: publication visibility, authorization, state transitions, editor round trips, search, and accessibility. Run relevant type, lint, and build checks when available. Report checks actually run and remaining limitations.
- Before introducing caches, define how edits and publication changes invalidate public results. Private content must not enter shared caches.
- Update documentation when an approved decision changes. Keep solutions proportionate to a single-author publication.
