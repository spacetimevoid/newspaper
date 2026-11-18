# Implementation roadmap

Status: Phase 0 review draft. Milestones describe future work; they do not authorize execution, installations, external connections, or deployment.

## Authorized frontend increments

- Phase 1A: foundation and newspaper homepage approved by the user.
- Phase 1B: local mock article reading at `/articles/[slug]`, linked homepage titles, structured safe content, related reading, missing-article state, and verification. Reading designs approved; browser and not-found HTML limitations remain documented in PRODUCT.md.
- Phase 2A: centralized typed topics, `/topics/[slug]`, category navigation destinations, filtering and newest-first sorting of the five existing samples, and verification. Topic designs approved.
- Phase 2B (current): URL-driven server-rendered `/search`, compact navigation icon, Vietnamese case/accent-insensitive title/excerpt/topic matching over published mocks, tests, and verification. This brings mock search forward from the broader Phase 4 milestone without authorizing backend work.
- Phase 3A (current, explicitly authorized): Supabase SSR email/password authentication, single-admin database allowlist, prepared SQL/RLS, manual setup documentation, protected articles placeholder, logout, and verification. No migration application, production auth-setting changes, deployment, CRUD, editor, or uploads. Live integration remains gated on an authorized configured test project; see AUTH.md.
- Stop after Phase 3A for review; do not start Phase 3B. The milestones below are the original high-level plan, not additional authorization.

## Phase 0 — Product specification (current)

Deliverables: engineering rules, MVP specification and flows, proposed sitemap and code structure, design guidance, acceptance criteria, and open questions.

Exit: review these documents, resolve or explicitly defer relevant questions, and obtain approval before writing application code. Repository inspection found an empty directory and no Git repository. There are no existing files or conflicting decisions to preserve.

## Phase 1 — Foundation and local editorial direction

- Confirm package manager, framework/library versions, and source structure against current official documentation.
- After approval, scaffold Next.js App Router with strict TypeScript and Tailwind. Establish Git and lockfile practices, lint/type/build checks, and local configuration guidance.
- Establish Vietnamese document language, basic responsive editorial shell, design tokens, and representative local content for review.
- Keep external services disconnected until separately authorized for integration work.

Dependencies: Phase 0 approval; branding and font direction or explicit placeholders approved for review.

Exit: reproducible local startup, passing foundational checks, reviewed mobile/desktop typography, and keyboard-accessible navigation. No real service credentials are required for this exit.

## Phase 2 — Content model, authentication, and access control

- Resolve article fields, topic cardinality, slugs, editor schema, publication/editing behavior, and author sign-in/provisioning.
- With integration authorization, configure Supabase and create reproducible schema migrations, least privilege grants, row policies, and generated types.
- Implement server authorization for the single author and published-only public data access. Define cache separation and invalidation before public data caching.
- Configure Storage only if media scope and privacy have been approved. Document environment variable names without real secret values.

Dependencies: data and authentication questions resolved; explicit permission to connect external services.

Exit: tests demonstrate anonymous published reads, denied private access for anonymous and non-author accounts, author CRUD permissions for approved operations, and consistent draft isolation. Migrations can reproduce the intended schema.

## Phase 3 — Author writing workflow

- Implement private article list, draft creation/editing, Tiptap schema, safe content pipeline, and approved topic controls.
- Implement explicit save and publication transitions, server validation, error handling, and published-edit behavior as agreed.
- Add media, preview, autosave, unpublish, or deletion only if approved in scope.

Dependencies: Phase 2 access controls and approved editor/publishing semantics.

Exit: author can create, save, reopen, format, organize, and publish an article; failed saves preserve input and report failure; rich text round trips correctly; keyboard editor workflow works; drafts remain private.

## Phase 4 — Public reading and discovery

- Implement published article index, reading pages, topics, and basic search using approved Vietnamese matching semantics.
- Add responsive loading, empty, error, and not-found states, approved metadata, and cache refresh after content mutations.
- Validate public rendering against supported editor formats and malicious content samples.

Dependencies: approved publication semantics, slugs, search matching, list ordering, and pagination decision.

Exit: complete reader flows satisfy `PRODUCT.md`; no draft data appears in public pages, search, metadata, or shared caches. Changes become visible according to the agreed publication behavior.

## Phase 5 — Quality and launch readiness

- Exercise complete author-to-reader flows and publication visibility, not just isolated components.
- Verify Vietnamese typography, responsive layouts, manual keyboard/screen-reader/zoom access, contrast, input validation, authorization, and rich text safety.
- Run relevant type, lint, build, and behavior tests. Agree on supported browsers and test representative devices.
- Prepare domain, indexing/metadata, environment, recovery/backup approach, and deployment documentation. Assess any launch privacy/legal content once requirements are known.
- Connect and deploy to Vercel only with deployment authorization. Verify the deployed flows and record any limitations before launch acceptance.

Dependencies: MVP acceptance criteria met; launch decisions and external service permissions resolved.

Exit: reviewed deployment meets agreed acceptance criteria, secrets remain private, author access and draft isolation are verified in the deployed environment, and operational/recovery instructions are documented.

## Decision gates and next step

The immediate next step is specification review. Prioritize sign-in/author authorization, topic cardinality, editor/media scope, publish validation, published-edit behavior, and Vietnamese search semantics. Resolve other open questions before their dependent milestone; do not invent answers to unblock implementation.

Once Phase 0 is approved, begin Phase 1 with a local Next.js scaffold and editorial typography review. Stop here until that approval is given.
