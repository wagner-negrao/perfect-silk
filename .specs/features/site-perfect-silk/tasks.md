# Site Perfect Silk Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow.

**If the skill cannot be activated, STOP and tell the user - do not proceed without it.**

**Desvio aprovado pelo projeto:** PLAN.md proíbe commits; nenhuma tarefa gera commit.

---

**Design**: `.specs/features/site-perfect-silk/design.md`
**Status**: Done (verificação independente por sub-agente não executada; ver resumo)

---

## Test Coverage Matrix

> Guidelines found: none - strong defaults applied.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| ---------- | ------------------ | -------------------- | ---------------- | ----------- |
| lib (whatsapp, validation, seo) | unit | All branches; 1:1 to spec ACs; every edge case | `src/lib/*.test.ts` | `npm test` |
| components and sections | unit | Renders, headings, interactions, ACs | `src/**/*.test.tsx` | `npm test` |
| pages and routes | integration | Section order, h1, CTA, a11y per route | `src/pages/*.test.tsx` | `npm test` |
| styles and config | none | build gate only | - | `npm run build` |

## Gate Check Commands

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | After tasks with unit tests | `npm test` |
| Full | After page/route tasks | `npm test && npm run build` |
| Build | After phase completion | `npm run lint && npm test && npm run build` |

---

## Execution Plan

### Phase 1: Foundation

```
T1 → T2 → T3 → T4 → T5
```

### Phase 2: Shared UI

```
T6 → T7 → T8 → T9
```

### Phase 3: Homepage

```
T10 → T11 → T12
```

### Phase 4: Inner pages

```
T13 → T14 → T15 → T16
```

### Phase 5: SEO and hardening

```
T17 → T18
```

---

## Task Breakdown

### T1: Scaffold Vite + React + TS + Vitest

**What**: Project config, scripts, test setup.
**Where**: `package.json`
**Depends on**: None
**Requirement**: NAV-01

**Done when**:

- [ ] `npm test` and `npm run build` run
- [ ] Test count: 1 smoke test passes

**Tests**: none
**Gate**: build

### T2: Design tokens and global styles

**What**: Tokens from Figma variables, Montserrat, base reset.
**Where**: `src/styles/tokens.css`
**Depends on**: T1
**Requirement**: NAV-01

**Done when**:

- [ ] Colors #FF6600 #1A1A1A #333333 #E9E9E9 #FFFFFF as tokens

**Tests**: none
**Gate**: build

### T3: WhatsApp URL builder

**What**: buildWhatsAppUrl and buildQuoteMessage.
**Where**: `src/lib/whatsapp.ts`
**Depends on**: T2
**Requirement**: WA-01

**Done when**:

- [ ] URL targets 5591981365656, text encoded, accents and newlines preserved
- [ ] Test count: all WA-01 cases pass

**Tests**: unit
**Gate**: quick

### T4: Quote form validation

**What**: validateQuoteForm with required fields and minimum 20.
**Where**: `src/lib/validation.ts`
**Depends on**: T3
**Requirement**: WA-01

**Done when**:

- [ ] Empty field, quantity < 20, non numeric quantity rejected with messages
- [ ] Test count: all branches pass

**Tests**: unit
**Gate**: quick

### T5: Page metadata and JSON-LD

**What**: Per route title, description, canonical, JSON-LD.
**Where**: `src/lib/seo.ts`
**Depends on**: T4
**Requirement**: SEO-01

**Done when**:

- [ ] Titles match spec for 4 routes; JSON-LD has confirmed data only

**Tests**: unit
**Gate**: quick

### T6: Header with mobile menu

**What**: Header, active item, mobile toggle.
**Where**: `src/components/Header.tsx`
**Depends on**: None (previous phase complete)
**Requirement**: NAV-01

**Done when**:

- [ ] aria-current, mobile toggle, hover states

**Tests**: unit
**Gate**: quick

### T7: Footer

**What**: Footer with contacts and privacy link.
**Where**: `src/components/Footer.tsx`
**Depends on**: T6
**Requirement**: NAV-01

**Done when**:

- [ ] Contacts and /privacidade link present

**Tests**: unit
**Gate**: quick

### T8: WhatsAppButton and Accordion

**What**: Shared CTA button and FAQ accordion.
**Where**: `src/components/WhatsAppButton.tsx`
**Depends on**: T7
**Requirement**: WA-01

**Done when**:

- [ ] Opens new tab with rel noopener noreferrer; accordion toggles aria-expanded

**Tests**: unit
**Gate**: quick

### T9: Layout, Seo component and routes

**What**: Layout, routing, prerender entry.
**Where**: `src/routes.tsx`
**Depends on**: T8
**Requirement**: NAV-01

**Done when**:

- [ ] 4 routes plus 404 render inside layout

**Tests**: integration
**Gate**: full

### T10: Home sections 01-04

**What**: Hero, Soluções, Processo, Personalização.
**Where**: `src/sections/home/`
**Depends on**: None (previous phase complete)
**Requirement**: HOME-01

**Done when**:

- [ ] h1 and h2 texts per spec, matches Figma

**Tests**: unit
**Gate**: quick

### T11: Home sections 05-08

**What**: Por que, Projetos realizados, FAQ, Orçamento.
**Where**: `src/sections/home/Faq.tsx`
**Depends on**: T10
**Requirement**: HOME-01

**Done when**:

- [ ] FAQ expands and collapses; minimum 20 pieces visible

**Tests**: unit
**Gate**: quick

### T12: Home page

**What**: Compose Home with ordered sections and mobile layout.
**Where**: `src/pages/Home.tsx`
**Depends on**: T11
**Requirement**: HOME-01

**Done when**:

- [ ] Section order test passes; 390px and 1920px compared to Figma

**Tests**: integration
**Gate**: full

### T13: Produção page

**What**: 4 sections of /producao.
**Where**: `src/pages/Producao.tsx`
**Depends on**: None (previous phase complete)
**Requirement**: PROD-01

**Done when**:

- [ ] Section order, single h1, CTA

**Tests**: integration
**Gate**: full

### T14: Projetos page

**What**: Gallery and sections of /projetos.
**Where**: `src/pages/Projetos.tsx`
**Depends on**: T13
**Requirement**: PROJ-01

**Done when**:

- [ ] All images with alt, single h1, CTA

**Tests**: integration
**Gate**: full

### T15: Contato page and quote form

**What**: Form wired to WhatsApp, channels, next steps.
**Where**: `src/pages/Contato.tsx`
**Depends on**: T14
**Requirement**: CONT-01

**Done when**:

- [ ] Valid submit opens WhatsApp URL; invalid shows errors

**Tests**: integration
**Gate**: full

### T16: Privacy and 404 pages

**What**: Placeholder privacy (noindex) and 404.
**Where**: `src/pages/Privacy.tsx`
**Depends on**: T15
**Requirement**: PRIV-01

**Done when**:

- [ ] /privacidade noindex; unknown route shows 404 with Home link

**Tests**: integration
**Gate**: full

### T17: Sitemap, robots and prerender check

**What**: Generate sitemap.xml and robots.txt at build.
**Where**: `scripts/generate-seo-files.mjs`
**Depends on**: None (previous phase complete)
**Requirement**: SEO-01

**Done when**:

- [ ] Build outputs HTML for 4 routes, sitemap with 4 URLs

**Tests**: unit
**Gate**: build

### T18: Accessibility sweep

**What**: jest-axe across all pages, keyboard and reduced motion.
**Where**: `src/pages/a11y.test.tsx`
**Depends on**: T17
**Requirement**: A11Y-01

**Done when**:

- [ ] Zero axe violations in 4 pages

**Tests**: integration
**Gate**: build
