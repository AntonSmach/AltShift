# Alt+Shift

AI-powered cover letter generator. Fill in the job details and get a personalized cover letter in seconds.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS v3** — styling
- **React Router v7** — navigation
- **React Hook Form** — form management
- **Groq API** (via OpenAI SDK) — AI letter generation with `llama-3.3-70b-versatile`
- **Fantasticon** — custom icon font from SVGs
- **Husky** + **lint-staged** + **commitlint** — git hooks and commit conventions

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

Copy `.env` and create `.env.local` with your Groq API key:

```bash
cp .env .env.local
```

Get a free API key at [console.groq.com](https://console.groq.com), then add it to `.env.local`:

```
VITE_GROQ_API_KEY=gsk_...
```

### 3. Run dev server

```bash
npm start
```

App will be available at `http://localhost:5173`

## Scripts

| Command                     | Description                                           |
| --------------------------- | ----------------------------------------------------- |
| `npm start`                 | Start dev server                                      |
| `npm run build`             | Production build                                      |
| `npm run preview`           | Preview production build locally                      |
| `npm run lint`              | Run ESLint                                            |
| `npm run format`            | Format with Prettier + ESLint fix                     |
| `npm run create-icon-fonts` | Regenerate icon font from SVGs in `src/assets/icons/` |

## Project Structure

```
src/
├── assets/          # Fonts, icons (SVGs)
├── context/         # React context + useReducer
├── helpers/         # Shared utilities (Groq client, localStorage)
├── hooks/           # Custom React hooks
├── layouts/         # App layout
├── models/          # TypeScript interfaces, enums, constants
├── pages/           # Route-level pages
│   └── GeneratorPage/
│       ├── components/  # Page-specific components
│       ├── helpers/     # Page-specific utilities
│       └── types/       # Page-specific types
├── routes/          # Route configuration
├── shared/
│   └── components/  # Reusable UI components
├── store/           # Reducers and state
└── utils/           # cn(), generateLetter
```

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
refactor: code change without feature/fix
chore: tooling, dependencies
style: formatting
```

Commits are validated automatically via `commitlint` on every `git commit`.

## Icons

Icons are stored as SVGs in `src/assets/icons/` and compiled into a custom icon font at `public/icons/fonts/`.

To add a new icon — drop an SVG into `src/assets/icons/` and run:

```bash
npm run create-icon-fonts
```

Use icons in components with the `i` tag:

```tsx
<i className='icon-plus' />
```
