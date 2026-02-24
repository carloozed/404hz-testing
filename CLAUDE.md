# 404Hz Frontend

Music discovery app for DJs. Scans mixes/sets to identify tracks.

## Tech Stack

- Next.js 15.3.6 (App Router, static export)
- React 19.1.0
- Zustand 5.0.7
- CSS Modules (migrating to Tailwind + shadcn)
- Prismic CMS
- GSAP animations

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # Static export to /out
rm -rf .next    # Clear cache if SSR errors
```

## Environment

```env
NEXT_PUBLIC_API_BASE_URL=https://admin.404hz.com
```

## Project Structure

```
src/
├── app/                    # Routes ONLY (page.tsx, layout.tsx, globals.css)
├── components/
│   ├── auth/               # Login, logout, login form
│   ├── dashboard/          # Dashboard client, sidebar, overview, collections
│   ├── discover/           # Discover content, search, genre previews, filters
│   ├── faq/                # FAQ content, left/right containers
│   ├── home/               # Homepage content, analyze field, catchphrase
│   ├── player/             # MiniPlayer, TrackAudioPlayer, IsBeingPlayedIndicator
│   ├── set/                # Set component, waveform, trackneedles, play/pause
│   ├── shared/             # Buttons, forms, nav, icons, placeholders, layout
│   ├── track/              # Track variants (dashboard, set, miniplayer), overlays
│   └── ui/                 # shadcn components (when installed)
├── hooks/                  # Custom React hooks
├── lib/                    # API client, helpers, utilities
├── providers/              # React context providers
├── stores/                 # Zustand stores
└── types/                  # TypeScript type definitions
customtypes/                # Prismic schemas (auto-generated)
public/                     # Static assets
```

## Routes

| Route              | Purpose                     |
| ------------------ | --------------------------- |
| `/`                | Homepage with analyze field |
| `/login`           | Login                       |
| `/dashboard`       | Main app (auth required)    |
| `/discover`        | Browse/search               |
| `/discover/search` | Search results              |
| `/faq`             | FAQ                         |

## API Endpoints

Base: `process.env.NEXT_PUBLIC_API_BASE_URL`

```
POST /auth/login/                      # Login
POST /registration/token/refresh/      # Token refresh
GET  /api/users/me/                    # Current user
GET  /api/users/me/sets/    # User's sets
GET  /api/users/me/tracks/  # User's tracks
GET  /api/track/favorites/  # Favorites
POST /api/track/favorites/toggle/{id}/  # Toggle favorite
GET  /api/set/search/       # Search sets
GET  /api/track/search/     # Search tracks
```

Full collection: `/postman.json`

## Key Stores

| Store                 | File                             | Purpose                                    |
| --------------------- | -------------------------------- | ------------------------------------------ |
| `useUserStore`        | `src/stores/UserStore.ts`        | Auth, user data, accessToken (has persist) |
| `usePlayerStore`      | `src/stores/PlayerStore.ts`      | Set/mix playback                           |
| `useTrackPlayerStore` | `src/stores/TrackPlayerStore.ts` | Track preview playback                     |
| `useFavoritesStore`   | `src/stores/useFavoriteStore.ts` | Favorites (optimistic updates)             |
| `useUserTracksStore`  | `src/stores/UserTracksStore.ts`  | Paginated user tracks                      |
| `useUserSetsStore`    | `src/stores/UserSetsStore.ts`    | Paginated user sets                        |

## Key Files

| File                    | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `src/lib/api/client.ts` | API client with 401 handling and token refresh |
| `src/prismicio.ts`      | Prismic client                                 |

## Known Gotchas

### Auth Token Storage

Auth tokens are stored in `useUserStore` (with Zustand persist) rather than raw localStorage. All API helpers use `apiClient` which handles token access and 401 refresh automatically.

### Import Paths

All imports use the `@/` alias which resolves to `src/`:

```typescript
import { x } from '@/stores/UserStore';
import Component from '@/components/shared/Component';
```

Within the same domain folder, use relative imports:

```typescript
// Inside src/components/set/
import SetName from './SetName';
```

### Component Naming

Some components were renamed to avoid conflicts when flattened. Examples:

- `ContentContainer` → `DashboardContentContainer`, `SectionContentContainer`, `OverviewContentContainer`
- `LeftContainer` → `FAQLeftContainer`
- `LoginContainer` → `HomeLoginContainer`
- `ResultsContainer` → `DiscoverResultsContainer`

## Brand Colors

```
Main:   #fefefe (white)
Black:  #2f2f2f
Accent: #F3ED1D (yellow)
Border: 0.5px solid #2f2f2f
```

## Prismic

Repo: `404hertz`
Content types in `/customtypes/`
Client: `src/prismicio.ts`

## Agent Rules

**At the start of every session**, read `.claude/current-work.md` to understand where things left off.

**Before finishing any session**, update `.claude/current-work.md` with:

- Current branch name
- What was accomplished this session
- What should be done next
- Any blockers or open questions

This is mandatory — do not end a session without updating it. When a branch is merged/done, wipe the file contents.
