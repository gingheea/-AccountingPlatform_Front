# Accounting Platform — Web

React frontend for a working accountant's practice: a public marketing site, a
client portal, and an admin panel, all against one ASP.NET Core API.

**Backend:** ASP.NET Core 8, in a separate repository.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Routing | react-router-dom 7 |
| Styling | Tailwind CSS 3.4 + the Relume preset |
| Components | @relume_io/relume-ui |
| Animation | framer-motion 12 |
| HTTP | axios, with an interceptor for auth and 401 handling |
| Notifications | react-hot-toast |
| Hosting | Vercel |

---

## Structure

```
src/
├── api/            axios instance: bearer token, 401 handling
├── components/
│   ├── admin/      admin tables, forms, modals
│   ├── layout/     navbar, footer, public and portal shells
│   ├── portal/     client-facing pieces
│   ├── relume/     marketing sections, by page
│   ├── shared/     used by more than one area
│   └── ui/         Pagination, ProgressBar, PasswordInput, SelectField …
├── constants/      enum ↔ label maps mirroring the backend
├── context/        AuthContext
├── hooks/          usePagedList, useDebouncedValue, useAuth …
├── pages/          public / admin / portal
├── services/       one module per API area
└── utils/          jwt decoding, error messages, page numbers
```

### Three areas, one bundle

| Area | Routes | Access |
|---|---|---|
| Public site | `/`, `/services`, `/about`, `/blog`, `/testimonials`, legal pages | anonymous |
| Client portal | `/portal/*` | signed in |
| Admin panel | `/admin/*` | `Admin` role |

Route protection lives in `ProtectedRoute`, which takes an `allowedRoles` list
and reads the roles out of the JWT. An expired token counts as *not*
authenticated — otherwise the user lands in their area only to have every
request come back 401.

---

## A few things worth knowing before editing

**The Relume Tailwind preset replaces Tailwind's own scales.** It is not additive.
`text-lg`, `text-xl` and `text-2xl` do not mean what they mean in stock
Tailwind, and `maxWidth` was replaced outright — which silently killed
`max-w-2xl … max-w-7xl` in 67 places until the scale was restored through
`theme.extend.maxWidth`. Check `tailwind.config.js` before assuming a utility
class does what the Tailwind docs say.

**Backend enums are mirrored in `src/constants/`.** Request status starts at 1,
not 0. Every mapping between a numeric backend value and a Ukrainian label lives
in that folder and nowhere else, so an off-by-one is fixed in one place.

**Pagination goes through `usePagedList`.** The hook owns page, page size,
filters and loading state. Filter setters are stable across renders
(`useCallback` with an empty dependency list) and return early when the value
has not actually changed — without both, a filter effect re-triggers itself and
the render loop takes the app down.

**Every direct child of `AnimatePresence` needs a `key`.** framer-motion tracks
children by key to know which one is leaving, and collapses a missing key to
`""` — so several keyless children silently share one key.

---

## Running locally

```bash
npm install
npm run dev
```

Create `.env.local` (git-ignored) and point it at your API:

```
VITE_API_URL=http://localhost:5167/api
```

`.env.example` holds the template. The production value is set in the Vercel
project settings, not in the repository.

### Scripts

```bash
npm run dev        # dev server with HMR
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint       # eslint
```

`vercel.json` rewrites every path to `/` so client-side routes survive a page
refresh and direct links.

---

## Status

Deployed and in use. Known open items: route-level code splitting (the initial
bundle is a single ~1.4 MB chunk), and 18 ESLint findings that are genuine hook
design issues rather than noise.
