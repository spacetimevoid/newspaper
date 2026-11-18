# Design specification

Status: approved Phase 1A redesign direction, 18 November 2026. Classic Newspaper Editorial supersedes the earlier Minimal Editorial blog presentation. Publication name: Khoảng lặng. Implementation remains a local frontend with five sample articles.

## Principles

- Classic Newspaper Editorial: an original Vietnamese single-author newspaper identity, informed by traditional newspaper hierarchy and column composition. Do not reproduce The New York Times logo, proprietary fonts, branding, or exact layout.
- Use typography, alignment, whitespace, and thin separators to establish hierarchy.
- Use warm off-white paper, near-black text, muted gray metadata, thin column rules, and occasional double or thicker section rules. Avoid cards, rounded containers, gradients, glassmorphism, shadows, unnecessary animation, and dashboard presentation.
- Keep administration a quiet writing workspace with clear text labels and restrained controls.
- Design for Vietnamese content first, including long titles, multi-line navigation labels, and full diacritic support.

## Typography guidelines

- Use locally hosted Noto Serif, a variable open-source font from Google Fonts, for masthead, headlines, article excerpts, and future long-form text. Its SIL Open Font License is retained beside the unmodified font in `src/app/fonts/OFL.txt`. Source: https://github.com/google/fonts/tree/main/ofl/notoserif. No runtime font service or package dependency is required. Verify actual Vietnamese glyph rendering during browser QA.
- Use Arial/Helvetica/system sans-serif for navigation, metadata, and utilities. Native fallback appearance may differ by device.
- Current scale: 36–68px responsive masthead; 28–40px lead headline; 20–24px supporting headlines; 16px excerpts (18px lead on wider screens), line height 1.7; 12–14px utility/navigation text. Future long-form articles should use 18–20px text at 1.6–1.8 line height. Avoid oversized promotional headings.
- Keep article measure around 60–75 characters where possible, with a proposed maximum width of roughly 42rem. Use narrower measures when the viewport requires them.
- Use a clear heading scale without excessive size jumps. Long titles must wrap naturally; never truncate article titles on the reading page.
- Use left-aligned text and comfortable paragraph spacing. Avoid justified body copy, all-caps passages, and excessive letter spacing, which can harm Vietnamese readability.
- Distinguish inline links through underlines or another non-color cue. Preserve meaningful emphasis, list indentation, and blockquote hierarchy in rendered editor content.

## Layout rules

- Header: small Vietnamese current-date utility row, centered serif Khoảng lặng masthead and restrained subtitle, then compact category navigation between rules. Display dates in Asia/Saigon time. Render the public shell per request so the date does not freeze at build time; an already-open page refreshes its date on reload.
- Phase 2A navigation uses centralized topic definitions in the existing label order. Category links now open `/topics/doi-song`, `/topics/doc-va-viet`, and `/topics/quan-sat`; “Trang nhất” retains its homepage destination. Masthead, navigation styling, and wrapping behavior remain approved and unchanged.
- Homepage refinement after Phase 2B: start the editorial section directly beneath navigation, with no standalone introduction. “Trang nhất” is the page h1, retaining its existing small label styling; front-page stories use h2 headings. Preserve the CSS Grid with a prominent lead story at roughly two-thirds width and two supporting stories stacked in the adjacent column, followed by the remaining two articles in a ruled section. All five existing articles appear once. Lead content has natural height and top alignment; optional images render only when supplied, without placeholders or reserved image space. Use vertical rules on desktop and horizontal rules on mobile.
- At widths below 768px, stack lead, supporting, then additional stories in DOM reading order. Let navigation wrap; do not use horizontal scrolling or a hidden menu. Keep 20px mobile gutters and 32px wider gutters, with a shared 75rem (1200px at the default root size) outer maximum including padding. Header, navigation rules, main, and footer use this same container; inner article reading widths remain unchanged.
- Lead story supports optional local image metadata (source, alt text, intrinsic dimensions, optional caption) and semantic figure rendering. Current samples have no chosen images; omit the figure entirely rather than showing a placeholder. This does not authorize uploads or media storage.
- Footer: compact publication name, current-year copyright, and text links for articles and return to top. Remove the introduction link with its deleted homepage anchor; restore an About link only when that page is approved and implemented.
- Phase 1B reading page: reuse the approved masthead and footer without visual changes. Center content in a maximum 680px column inside existing responsive gutters. Use a 32px mobile title, 40px at small tablet widths, and 48px desktop title; serif body 18px mobile / 19px wider, line height 1.7. Category, author, and publication date are sans-serif; excerpt serves as the lead paragraph. Add a thin header/body divider, optional image/caption, semantic body blocks, and a ruled “Đọc tiếp” section. Include homepage return links. No sidebar, share controls, cards, or animation.
- Phase 2A topic pages reuse the shared shell, paper palette, and 42rem reading width. Present a serif topic name, short description, and a single-column list of existing article summaries separated by thin horizontal rules. Use sans-serif dates and metadata, semantic h1/h2 hierarchy, and existing mobile gutters. No imagery, cards, or pagination is needed for the five samples.
- Phase 2B adds an 18px search icon within a 44px navigation target with a screen-reader label. Search reuses the 42rem column and original palette. Use a serif “Tìm kiếm” heading, a compact native GET form with visible “Từ khóa” label, sans-serif input/help/count, and a “Tìm” submit control. Inputs and controls have visible keyboard focus, 44px minimum heights, square borders, and flexible wrapping. Results reuse existing serif story summaries with h2 headings and thin rules. Initial and no-match guidance remain text-led. No client search animation, decorative containers, or changes to approved page layouts.
- Admin: simple article list and focused editor. Use clear Draft/Published text, accessible save/publish controls, and unobtrusive feedback. Avoid analytics widgets and sidebar machinery without a demonstrated need.
- Use a consistent 4px spacing scale with compact 12–28px editorial gaps. Favor purposeful density over the previous large hero and excessive whitespace.
- Let content drive breakpoints. At 320 CSS pixels, core workflows must remain usable without horizontal page scrolling. Any inherently wide approved content needs its own accessible overflow treatment.
- Do not use fixed heights for text areas or article content. Ensure long Vietnamese words, URLs, and titles cannot break the layout.
- Keep primary actions reachable on mobile; toolbars may wrap or reorganize without hiding their keyboard functions or obscuring content.
- Loading, empty, error, unauthorized, and not-found states use the same visual language and provide an appropriate next action.

## Color and interaction

- Use a small neutral palette: background, surface when functionally needed, primary text, muted text, border, and focus/action colors.
- Tokens: paper `#f8f7f3`, ink `#20201d`, muted `#62625b`, decorative rule `#c5c4bc`, focus `#294e69`. Thin rules supplement spacing; they are not the sole indicator of an interactive control. Verify text/focus contrast as part of implementation QA.
- State changes must be explicit in text; color alone must never communicate draft/published, errors, or success.
- Use native interactions where practical. Keep controls visibly interactive with clear hover, focus, active, and disabled states.
- No animation is required for MVP. Honor reduced-motion preferences if functional motion is later introduced.

## Accessibility requirements

Target WCAG 2.2 AA for the complete reader and author workflows; verify during implementation rather than assuming compliance from styling.

- Use semantic landmarks, a skip link, descriptive page titles, one primary page heading, and a logical heading hierarchy. Set the primary document language to `vi`.
- Provide full keyboard navigation with logical focus order, visible focus indicators, no traps, and no focus hidden under fixed controls.
- Provide accessible names for all controls and persistent labels for form fields. Connect validation errors to fields and describe corrections in Vietnamese.
- Announce save, publish, and search status appropriately without repeated intrusive announcements. Preserve focus and entered content after failures.
- Verify text contrast of at least 4.5:1 for normal text and 3:1 for large text; meaningful controls, boundaries, and focus indicators need at least 3:1 against adjacent colors.
- Aim for 44×44px touch targets; satisfy the WCAG AA target-size minimum of 24×24 CSS pixels or its permitted spacing exceptions.
- Support text resizing to 200% and reflow at 400% zoom on a desktop viewport without losing core functionality or requiring two-dimensional page scrolling.
- Editor toolbar buttons must expose names and pressed states where relevant. Formatting must be available by keyboard; test entering, leaving, and navigating the editable region with a screen reader.
- Rich text output must preserve semantic headings, lists, quotations, and links. If media is approved, informative images require editable alternative text; decorative images use empty alternative text.
- Do not rely on hover alone for essential information. Link text must describe its destination; any new-window behavior must be communicated.
- If dialogs are needed, manage initial focus, dismissal, focus containment, and focus return correctly.

## Verification and unresolved choices

Phase 3A admin UI is a separate minimal shell using the same paper, serif identity/headings, and sans-serif labeled controls. Login has email/password fields with appropriate autocomplete, a pending/disabled button, generic announced errors, and a homepage link. The protected placeholder has an identity, logout form, and Phase 3B message. Neither alters the public shell or introduces dashboard cards. Full browser/keyboard verification remains subject to browser availability.

During UI work, review representative Vietnamese articles, long titles, dense diacritics, empty results, save failures, and both article states at mobile and desktop sizes. Combine automated accessibility checks with manual keyboard, zoom/reflow, and screen-reader checks; automated checks alone cannot establish compliance.

Unresolved: author identity, selected lead photography and credits, future media requirements, optional dark mode, and supported browser/device matrix. Dark mode is not a confirmed MVP requirement. Publication name, newspaper direction, font choice, and current tokens are settled for this redesign; actual desktop/mobile rendering remains subject to browser verification. Sample excerpts and dates are presentation fixtures, not finalized database requirements.
