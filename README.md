# 404hz Frontend

The frontend application for 404hz, built with Next.js 15 and React 19.

## tech stack

- **framework:** Next.js 15 (with Turbopack)
- **ui:** React 19
- **state management:** Zustand
- **cms:** Prismic
- **animations:** GSAP
- **styling:** CSS Modules
- **language:** TypeScript

## prerequisites

- Node.js 18+ (recommended: 20+)
- npm

## getting started

### 1. clone the repository

```bash
git clone https://gitlab.com/404hz-group/404hz-frontend.git
cd 404hz-frontend
```

### 2. install dependencies

```bash
npm install
```

### 3. set up environment variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_BASE_URL=https://admin.404hz.com
NEXT_PUBLIC_SPOTIFY_PREVIEW_URL=<spotify-preview-worker-url>
NEXT_PUBLIC_DEEZER_PREVIEW_URL=<deezer-preview-worker-url>
```

### 4. run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## available scripts

| command                | description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | start development server with turbopack |
| `npm run build`        | create production build                 |
| `npm run start`        | start production server                 |
| `npm run lint`         | run eslint                              |
| `npm run slicemachine` | start prismic slice machine ui          |
| `npm run clean`        | remove `.next` build directory          |

## project structure

```
├── lib/                  # shared utilities, types, helpers, api helpers
├── public/               # static assets
├── src/
│   ├── app/              # next.js app router pages and components
│   ├── prismicio.ts      # prismic client configuration
│   └── slices/           # prismic slice components
├── stores/               # zustand stores
├── customtypes/          # prismic custom type definitions
└── slicemachine.config.json
```

## prismic cms

This project uses Prismic as a headless CMS. To work with content models:

```bash
npm run slicemachine
```

This opens the Slice Machine UI at [http://localhost:9999](http://localhost:9999) where you can create and edit slices and custom types.

## path aliases

The project uses the `@/*` alias for imports from the `src/` directory:

```typescript
import Component from '@/app/_components/Component/Component';
```

## deployment

The project is configured with GitLab CI/CD (see `.gitlab-ci.yml`).

To create a production build locally:

```bash
npm run build
npm run start
```
