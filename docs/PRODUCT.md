# Product specification

Status: Phase 0 review draft, 18 November 2026. No application implementation is authorized yet.

Implementation update: the user approved Phase 1A and authorized Phase 1B article reading. This supersedes the original implementation stop above for those scopes only. The newspaper homepage remains approved; `docs/DESIGN.md` records its current design.

### Phase 1B mock reading model

The five existing samples now use typed `id`, `slug`, `title`, `excerpt`, `category`, `author`, `publishedAt`, and `content`, plus an optional local image. Slugs preserve the existing sample identifiers. Date-only publication values retain the previous display dates through one Vietnamese formatter. The byline “Tác giả Khoảng lặng” is a temporary mock identity; the actual author's name remains open.

Content is a discriminated union of paragraphs, level 2/3 headings, blockquotes, ordered/unordered lists, and optional local images with alt text, dimensions, and captions. Text is escaped by React; there is no raw HTML, arbitrary markup, remote content, or rich text editor. This local representation does not settle the future Tiptap or database schema. No sample image has been selected yet.

Homepage headlines link to `/articles/[slug]`. Article routes reuse the public shell, supply article-specific metadata, and call `notFound()` for unknown slugs. Related reading excludes the current article, prioritizes its category, and fills two slots from the remaining samples in existing recent-first order. The reading flow does not add topics, search, authoring, or backend functionality.

Phase 1B verification limitation: unknown slugs return HTTP 404 with `noindex`, but the installed Next.js 16.4.6 emits an empty initial HTML body with the localized not-found component only in its React payload. No-JavaScript fallback rendering fails; client hydration cannot be verified while browser access is unavailable. Similar behavior is reported upstream at https://github.com/vercel/next.js/issues/95613. Moving boundaries and restricting generated mock params did not correct it, so those workarounds were removed. Resolve this framework issue before launch; do not consider visual not-found behavior verified.

### Phase 2A topic browsing

The user approved the homepage and reading designs and authorized mock topic pages only. Centralized readonly `Topic` definitions contain `slug`, `name`, and `description`. Stable routes are `/topics/doi-song` (Đời sống), `/topics/doc-va-viet` (Đọc & viết), and `/topics/quan-sat` (Quan sát). Existing article category values are constrained to the centralized topic-name union; article content is unchanged. This keeps the current single-category mock representation without settling future database topic cardinality.

The query helper filters the original sample array by topic and sorts a new result array by ISO publication date descending, with slug ordering for ties. It never duplicates or mutates article data. Current counts are 2, 2, and 1 respectively. Query logic is separate from presentation so pagination may be added later if needed; no pagination is implemented now. Each topic lists linked titles, excerpts, and dates, has descriptive page metadata, and calls `notFound()` for unknown slugs. Empty valid topics have a readable empty state. The header's existing category labels now link to topic pages.

Prior verification gaps remain tracked above: desktop/mobile browser review and unknown-slug initial HTML. Phase 2A verification results are reported at completion; search, `/topics` index, admin, authentication, and external services are not included.

Phase 2A verification: ESLint, strict TypeScript, and production build pass. Production HTTP checks confirm all three topics return 200 with exact membership, newest-first order, valid dates, one h1 and h2 story headings, working article links, and working homepage/category navigation. Unknown topic and article slugs return 404 with `noindex`; both reproduce the prior empty initial-HTML limitation. Browser access host remains unavailable, so desktop/mobile rendering, keyboard operation, and hydrated not-found UI remain unverified. No dependencies or article text were changed.

### Phase 2B search

The user approved the prior frontend designs and authorized `/search?q=keyword` using existing mock articles only. This settles the earlier search-scope proposal for the current phase: match title, excerpt, and topic name, not body text. The native GET form is server-rendered; the URL is the source of query state. Missing, empty, and whitespace-only queries show zero results and guidance. Repeated `q` parameters use their first value. The input reflects the cleaned query; the URL retains the submitted spelling/spacing.

The pure search utility trims and collapses whitespace, lowercases Vietnamese text, removes Unicode combining accents after NFD normalization, and maps `đ` to `d`. It performs literal substring matching within any one searchable field; multiword input is a contiguous phrase, not fuzzy matching or independent keyword ranking. Results sort newest first by ISO publication date, with slug tie-breaking, without mutating the source array. Every mock article now has explicit `draft | published` status; the five existing samples remain published, and search excludes drafts regardless of publication date.

The header adds only an accessible search-icon link. The search page reuses the shell and article summaries, with result count and distinct initial/no-match guidance. No external services, pagination, editor, or account features were added.

Verification: `npm test` uses Node's built-in test runner (verified on Node 24.20.0 with native TypeScript stripping) and passes 10 tests: case/diacritic handling, decomposed Unicode, whitespace, empty/missing queries, no matches, excerpts/topics, multiple matches, ordering/immutability, draft exclusion, and body/regex exclusion. The runner emits a harmless module-type detection warning because the existing package has no module type declaration. ESLint, TypeScript, and production build pass. Production HTTP checks pass for search query variants, GET/input state, result counts and links, escaped query text, all topic memberships, homepage search navigation, and all five article pages. Browser host remains unavailable; desktop/mobile interaction and visual review remain unverified. Earlier unknown-slug HTML and tooling-audit limitations remain open.

## Repository baseline

### Phase 3A authentication

Authorized routes are `/admin/login` (superseding the earlier proposed `/admin/sign-in`) and the guarded `/admin/articles` placeholder. Email/password only, one operator-managed admin UUID, no registration or CRUD. See `AUTH.md` for the server-only Supabase SSR integration, SQL allowlist/RLS, environment variables, manual bootstrap, test boundaries, and integration gates. No credentials were configured or migrations applied; production auth settings were not modified. The user authorized implementation only through Phase 3A, with setup steps left manual.

### Homepage refinement after Phase 2B

The user authorized a small visual refinement only: shared 1200px outer container, unchanged responsive gutters, editorial section directly under navigation, and natural-height lead content with existing optional-image behavior. Article content, masthead, navigation categories/search, colors, and editorial grid remain unchanged. No next phase is authorized.

Preserved introduction copy for a possible future About page (not implemented):

> Đọc chậm, nghĩ sâu.
>
> Những ghi chép của tôi về đời sống, việc đọc và những điều đáng dừng lại để ngẫm nghĩ.

The former footer introduction link was removed because its homepage target no longer exists. About-page scope remains an open decision.

Inspection found an empty workspace with no existing project files or Git repository. No prior decisions or conflicts were found. This document records the requested product and proposes boundaries for review; it does not imply that tooling or services exist.

## Purpose and users

A minimal personal editorial website for one author, with a public reading experience and a private writing interface. Vietnamese is the primary content and interface language. A multilingual interface or translation system is not part of the proposed MVP.

- Reader: discover, search, and read published articles across screen sizes.
- Author: sign in privately, compose rich text, save drafts, organize articles by topic, and publish.

## Confirmed MVP capabilities

- Public reading of published articles.
- Private administration restricted to one authorized author.
- Rich text editing with Tiptap.
- Draft and published article states.
- Topic-based organization and basic article search.
- Responsive, accessible, Vietnamese-first presentation.
- Planned stack: Next.js App Router, strict TypeScript, Tailwind CSS, Supabase PostgreSQL/Auth/Storage, Tiptap, Vercel.

## Proposed MVP boundaries

These choices require approval with the specification or resolution below before dependent work.

- Home doubles as the article index; topic pages narrow the list. Proposed list order is newest publication first.
- Author can create and edit articles and assign topics through a simple private article list and editor.
- Start with explicit Save draft and Publish actions, with clear pending, success, and error feedback. Autosave is deferred unless requested.
- Proposed editor baseline: paragraphs, headings below the page title, bold, italic, lists, blockquotes, links, undo, and redo. Media, tables, code blocks, and other extensions remain undecided.
- Proposed search covers published article titles and body text. Scope, matching rules, and Vietnamese accent behavior require agreement before implementation.
- Proposed exclusions: reader accounts, comments, subscriptions, payments, newsletters, collaboration, scheduled publishing, analytics dashboards, and localization tooling. Deletion, revision history, and unpublishing need explicit decisions rather than assumed behavior.

## Content and architecture proposal

- Article concept: stable identity, title, route slug, structured editor body, draft/published status, publication time, and creation/update times. Excerpts and cover images are undecided.
- Topic concept: stable identity, display name, route slug. One versus multiple topics per article is unresolved.
- Persist structured Tiptap content as the proposed source of truth; derive public rendering and searchable plain text through one controlled pipeline. The exact schema is a later design deliverable.
- Use server rendering for public pages and a client editor inside server-authorized admin routes. Centralize visibility predicates and validation in server domain modules.
- Public access is published-only. Access control must apply to direct data requests and generated metadata as well as visible pages. Private previews, if approved, remain authorized and uncached publicly.
- Supabase is the planned persistence, authentication, and media provider. No schema, project, bucket, credentials, or account has been created or connected.

## User flows

1. Discover and read: open home → browse article links → open a published article → navigate to its topic or return to the list. Missing or inaccessible article URLs show a public not-found state without revealing draft details.
2. Browse topics: open topic index → choose a topic → read matching published articles. Empty topics have an understandable empty state.
3. Search: enter a query → submit → view matching published articles → open a result. Blank input, no matches, and failures have distinct feedback. Exact matching semantics remain open.
4. Author access: open admin → authenticate if necessary → server verifies the designated author → open article list. Other users are denied; the mechanism for provisioning the author is undecided.
5. Draft: create article → enter title and rich text → save draft → receive confirmed save feedback → reopen and continue editing. Draft URLs and content remain private.
6. Publish: open saved draft → validate required fields → publish → receive success only after persistence succeeds → article becomes reachable through public reading, topic browsing, and applicable search results.
7. Edit: open an existing article → change content → save. Whether edits to a published article go live immediately or require a separate publish action is an open decision.
8. Sign out: author signs out → subsequent protected reads and writes require authorization again.

## Proposed sitemap

| URL | Purpose | Access |
| --- | --- | --- |
| `/` | Home and published article index | Public |
| `/articles/[slug]` | Article reading | Public, published only |
| `/topics` | Topic index | Public |
| `/topics/[slug]` | Published articles for a topic | Public |
| `/search?q=...` | Search form and results | Public, published only |
| `/admin/sign-in` | Author authentication | Public entry, no registration UI proposed |
| `/admin` | Redirect to article list | Authorized author |
| `/admin/articles` | Draft and published article list | Authorized author |
| `/admin/articles/new` | New draft editor | Authorized author |
| `/admin/articles/[id]/edit` | Existing article editor | Authorized author |

Topic management placement depends on the taxonomy decision. Authentication callback routes depend on the chosen sign-in method. Route labels are technical proposals; visible labels should be Vietnamese.

## MVP acceptance criteria

| Area | Observable pass condition |
| --- | --- |
| Public reading | A published article opens directly with its title and correctly rendered rich text; missing and draft slugs reveal no private content. |
| Discovery | Home lists published articles; topic pages contain only matching published articles; links resolve correctly. |
| Search | Agreed title/body matching works with Vietnamese test content; drafts are excluded; empty input, no results, and errors are handled. Accent rules must be settled before sign-off. |
| Authorization | Anonymous visitors and authenticated non-author accounts cannot read private article data or perform author actions, including direct requests. |
| Draft persistence | Author saves, leaves, and reopens a draft with its supported formatting intact; a failed save displays failure and retains editable input. |
| Publication | Valid draft can be published; failed publication never shows success; successful publication appears publicly without an unexplained stale result. |
| Published editing | Behavior matches the approved editing model and public caches are refreshed accordingly. This criterion remains blocked on that decision. |
| Topics | Author can organize articles using the approved topic cardinality and management flow. |
| Content safety | Unsupported or malicious rich text cannot execute scripts or unsafe links in either editor preview or public rendering. |
| Vietnamese | Interface labels, errors, and content display support Vietnamese diacritics; chosen fonts contain the required glyphs. |
| Responsive access | Reading and author workflows work at narrow mobile and desktop widths with keyboard and touch; no unintended horizontal page scroll. |
| Accessibility | Meet the requirements and manual checks in `DESIGN.md`, including contrast, focus, semantics, labels, and editor keyboard operation. |

## Open questions

1. What publication name, author identity, and navigation copy should be used? Is an About page needed in MVP?
2. Which sign-in method and recovery flow should the single author use, and how is that author provisioned and authorized?
3. Can an article have one topic or several? Are topics optional? Can the author create, rename, or delete them?
4. Which editor formats are required? Are inline images, cover images, captions, alt text, and uploads part of MVP? What media privacy and file limits apply?
5. Which fields are required to publish? Are an excerpt and a topic required? What are title/body length limits?
6. Should search ignore Vietnamese accents and case, match partial words, and search titles, body, or topics? What result ordering is expected?
7. How are Vietnamese slugs generated, how are collisions handled, and can published slugs change? Are redirects required?
8. Do edits to published articles go live on save, or stay private until republished? Are unpublish, delete, preview, and revision recovery needed?
9. Is manual save sufficient? Is an unsaved-change warning or autosave required?
10. Confirm publication ordering, display dates/timezone, pagination needs, and expected article volume.
11. What domain, metadata, social previews, indexing policy, and privacy/legal content are needed for launch? No jurisdiction-specific requirements are assumed.

## Proposed project structure

Create only after approval. Route groups organize code without changing URLs. Start small and add folders only when used.

```text
AGENTS.md
docs/
  PRODUCT.md
  DESIGN.md
  ROADMAP.md
src/
  app/
    layout.tsx                 # Root language, global metadata, styles
    globals.css
    (public)/
      layout.tsx               # Editorial shell
      page.tsx
      articles/[slug]/page.tsx
      topics/page.tsx
      topics/[slug]/page.tsx
      search/page.tsx
    admin/
      sign-in/page.tsx
      (protected)/
        layout.tsx             # Author gate; each operation also checks access
        page.tsx
        articles/page.tsx
        articles/new/page.tsx
        articles/[id]/edit/page.tsx
  components/
    editorial/                 # Article display and navigation
    editor/                    # Tiptap client boundary
    ui/                        # Only genuinely shared controls
  lib/
    articles/                  # Validation, state rules, server queries/actions
    topics/
    search/
    auth/                      # Server author authorization
    editor/                    # Shared schema and safe rendering transforms
    supabase/                  # Server/browser adapters, server-only boundaries
  types/                       # Generated database types when integrated
public/                        # Approved static assets
supabase/
  migrations/                  # Versioned schema and policies in a later phase
tests/                         # Behavior/integration tests as needed
```

Prefer colocated loading, error, and not-found boundaries where relevant. Add route handlers only when an HTTP endpoint is needed; use server-side operations for internal mutations where appropriate. Exact framework APIs, tooling versions, caching strategy, and database schema are deferred to implementation planning.
