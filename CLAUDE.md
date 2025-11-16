# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Anime Search App** - A two-page React application for searching and viewing anime details using the Jikan API (MyAnimeList unofficial API).

### Tech Stack
- **React 19** with TypeScript (hooks only, no class components)
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **Vite** as build tool (port 4000)
- **Tailwind CSS v4** for styling
- **shadcn/ui** (New York variant) for UI components
- **Jikan API v4** for anime data

## Development Commands

```bash
# Start development server (opens on port 4000)
npm run dev
# or
npm start

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (Vitest with React Testing Library)
npm test

# Linting
npm run lint           # Check for lint errors
npm run lint:fix       # Auto-fix lint errors

# Code formatting
npm run format         # Format all files with Prettier
npm run format:check   # Check formatting without making changes

# Type checking
npm run type-check     # Run TypeScript type checking without emitting files
```

## Project Requirements

### Core Features

**Page 1: Search Page** (`/`)
- Search input with 250ms debouncing
- Instant search (no button required)
- Cancel in-flight API requests when user continues typing
- Display anime search results from Jikan API
- Server-side pagination
- Skeleton loaders during loading
- Empty state when no results found

**Page 2: Detail Page** (`/anime/:id`)
- Display detailed information about selected anime
- Route parameter-based navigation
- Skeleton loader while fetching

### Critical Technical Requirements

**Must Use:**
- npm only (no yarn, pnpm, or other package managers)
- Must be runnable with: `npm install` && `npm run dev`
- Dev server must start on **port 4000**
- No environment variables (app should work immediately after installation)
- No Next.js (SPA only)
- Redux for state management (required)
- TypeScript with proper typing (minimal 'any' usage)

**Submission Requirements:**
- Clean, well-formatted code following React and TypeScript best practices
- Logical folder structure with reusable components
- Clear separation of concerns
- Proper hook usage and avoiding anti-patterns
- Efficient re-rendering

## Jikan API v4 Documentation

### Base URL
```
https://api.jikan.moe/v4
```

### Rate Limits (CRITICAL)
- **30 requests per minute**
- **2 requests per second**
- No authentication required
- Must implement request cancellation for search

### Key Endpoints

**Search Anime:**
```typescript
GET /anime?q={query}&page={page}&limit={limit}

// Example
https://api.jikan.moe/v4/anime?q=naruto&page=1&limit=20
```

**Response Structure:**
```typescript
{
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    }
  };
  data: Array<{
    mal_id: number;
    title: string;
    title_english: string;
    title_japanese: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    synopsis: string;
    type: string; // "TV", "Movie", "OVA", etc.
    episodes: number;
    status: string; // "Finished Airing", "Currently Airing"
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    genres: Array<{ mal_id: number; name: string; }>;
    aired: {
      from: string;
      to: string;
      string: string;
    };
  }>
}
```

**Get Anime by ID:**
```typescript
GET /anime/{id}

// Example
https://api.jikan.moe/v4/anime/1
```

**Response Structure:**
```typescript
{
  data: {
    mal_id: number;
    url: string;
    title: string;
    title_english: string;
    title_japanese: string;
    // ... (same fields as search result)
    trailer: {
      youtube_id: string;
      url: string;
      embed_url: string;
    };
    // ... additional detailed fields
  }
}
```

### API Best Practices

1. **Request Cancellation:** Always cancel pending requests when user types
2. **Debouncing:** Implement 250ms debounce for search input
3. **Error Handling:** Handle rate limiting (429) and network errors gracefully
4. **Caching:** Use Redux to cache search results and details
5. **Loading States:** Show skeleton loaders during API calls

## Architecture

### Redux Store Structure

The application uses Redux Toolkit with a modular slice-based architecture:

**Store setup:** `src/app/store.ts`
- Uses `combineSlices()` to automatically combine reducers
- Includes `makeStore()` factory for testing

**Pre-typed hooks:** `src/app/hooks.ts`
- **ALWAYS use `useAppDispatch` and `useAppSelector`** instead of raw react-redux hooks (enforced by ESLint)

### Required Slices

**1. Anime Search Slice** (`src/features/anime/animeSlice.ts`)
```typescript
// State shape
{
  searchResults: Anime[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

// Actions needed:
- searchAnime(query, page) - async thunk
- setSearchQuery(query)
- clearSearch()
- cancelSearch()
```

**2. Anime Detail Slice** (`src/features/anime/animeDetailSlice.ts`)
```typescript
// State shape
{
  animeDetails: Record<number, AnimeDetail>;
  currentAnimeId: number | null;
  loading: boolean;
  error: string | null;
}

// Actions needed:
- fetchAnimeDetail(id) - async thunk
```

### File Structure

```
src/
├── app/
│   ├── store.ts              # Redux store configuration
│   ├── hooks.ts              # Pre-typed hooks (useAppDispatch, useAppSelector)
│   └── createAppSlice.ts     # Custom slice creator
├── features/
│   └── anime/
│       ├── components/
│       │   ├── AnimeCard.tsx       # Single anime result card
│       │   ├── AnimeGrid.tsx       # Grid layout for results
│       │   ├── SearchBar.tsx       # Search input with debouncing
│       │   └── Pagination.tsx      # Pagination controls
│       ├── pages/
│       │   ├── SearchPage.tsx      # Page 1: Search results
│       │   └── DetailPage.tsx      # Page 2: Anime details
│       ├── animeSlice.ts           # Search state management
│       ├── animeDetailSlice.ts     # Detail state management
│       ├── animeApi.ts             # Jikan API service layer
│       └── types.ts                # TypeScript interfaces
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── layout/
│       ├── Header.tsx
│       └── ErrorBoundary.tsx
├── hooks/
│   └── useDebounce.ts        # Custom debounce hook
├── lib/
│   └── utils.ts              # cn() utility for Tailwind
├── router/
│   └── index.tsx             # React Router configuration
├── types/
│   └── api.ts                # Shared API types
└── main.tsx                  # App entry point
```

## Clean Code Principles (Essential)

### 1. Code Organization

**Modularity:**
- ES6 modules with `import` and `export`
- Each file has its own private namespace
- Avoid polluting global namespace

**Vertical Structure (Newspaper Metaphor):**
- Related concepts kept vertically close
- Separate thoughts with blank lines
- High-level functions at top, details below

**Step-Down Rule:**
- If function A calls function B, A should be above B
- Creates downward flow from high to low abstraction

### 2. Naming Conventions

**Components/Classes:** Use noun phrases
```typescript
✅ AnimeCard, SearchResults, PaginationControls
❌ Manager, Processor, Data
```

**Functions/Methods:** Use verb phrases
```typescript
✅ fetchAnimeList, handleSearch, formatDate
❌ anime, search, date
```

**Accessors/Mutators:** Prefix with get/set/is
```typescript
✅ getSearchQuery, setCurrentPage, isLoading
❌ searchQuery(), currentPage(), loading()
```

**Consistency:** One word per concept
```typescript
✅ fetchAnime, fetchAnimeDetail (consistent)
❌ fetchAnime, getAnimeDetail, retrieveAnime (inconsistent)
```

### 3. Function Design

**Single Responsibility:**
- Functions should do ONE thing and do it well
- If a function can be divided into sections, it's doing too much

**Small Size:**
- Keep functions small
- Indentation level should be 1-2 max

**Single Abstraction Level:**
```typescript
// ❌ BAD - mixing abstraction levels
function displayAnime(anime: Anime) {
  const html = `<div>${anime.title}</div>`; // Low level
  renderToScreen(html); // High level
}

// ✅ GOOD - single abstraction level
function displayAnime(anime: Anime) {
  const card = createAnimeCard(anime);
  renderCard(card);
}
```

**Few Arguments:**
- Zero arguments is best, then one, two, three
- More than three requires justification

**No Flag Arguments:**
```typescript
// ❌ BAD - flag argument
function render(isSuite: boolean) {
  if (isSuite) {
    renderForSuite();
  } else {
    renderForSingleTest();
  }
}

// ✅ GOOD - split into two functions
function renderForSuite() { /* ... */ }
function renderForSingleTest() { /* ... */ }
```

**No Side Effects:**
- Functions should ideally have no side effects
- If they must change state, change only the object they're called on

### 4. Anti-Patterns to Avoid

**Code Duplication:**
- Biggest enemy of clean code
- Extract common logic into reusable functions

**Train Wrecks (Law of Demeter):**
```typescript
// ❌ BAD
const url = anime.images.jpg.image_url;

// ✅ GOOD
const url = getAnimeImageUrl(anime);
```

**Passing/Returning Null:**
```typescript
// ❌ BAD
function findAnime(id: number): Anime | null {
  return anime || null;
}

// ✅ GOOD - Use Special Case Object
const EMPTY_ANIME: Anime = { /* empty state */ };
function findAnime(id: number): Anime {
  return anime || EMPTY_ANIME;
}
```

**Using `var`:**
- Always use `const` or `let`
- Never use `var` (function-scoped, source of bugs)

**Mixing Abstraction Levels:**
- Keep high-level and low-level logic separate

### 5. Testing Best Practices

**TDD Foundation:**
- Write failing test first
- Write minimal code to pass test
- Refactor while keeping tests green

**F.I.R.S.T. Principles:**
- **F**ast - Tests run quickly
- **I**ndependent - Tests don't depend on each other
- **R**epeatable - Same result every time
- **S**elf-validating - Pass or fail, no manual checking
- **T**imely - Written at the right time (before production code)

## UI Components (shadcn/ui)

### Available Components

Use these shadcn/ui components (already installed):

```bash
# Core components needed
- Button
- Input
- Card
- Skeleton
- Badge
- Pagination (if available, otherwise build custom)
```

### Component Usage

**Path aliases:** `@/` maps to `src/`
```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

**Styling utility:**
```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-classes', conditional && 'extra-classes')} />
```

**Icons:**
```typescript
import { Search, Loader2 } from 'lucide-react';
```

## TypeScript Configuration

**Type imports:** Use `import type` syntax
```typescript
✅ import type { Anime } from './types';
❌ import { Anime } from './types';
```

**Prefer `type` over `interface`:**
```typescript
✅ type Anime = { /* ... */ }
❌ interface Anime { /* ... */ }
```

**Path aliases:**
```typescript
✅ import { cn } from '@/lib/utils';
❌ import { cn } from '../../../lib/utils';
```

## Implementation Guidelines

### Custom Hooks

**useDebounce Hook** (src/hooks/useDebounce.ts)
```typescript
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### Request Cancellation

**Using AbortController:**
```typescript
// In Redux thunk
export const searchAnime = createAsyncThunk(
  'anime/search',
  async ({ query, page }: SearchParams, { signal }) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`,
      { signal } // Pass abort signal
    );
    return response.json();
  }
);

// Cancel previous request automatically when new one is dispatched
```

### Error Handling

**API Errors:**
```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    // Request was cancelled, ignore
    return;
  }
  throw error; // Re-throw other errors
}
```

**Rate Limiting:**
- Display user-friendly message when rate limited
- Consider implementing request queue or backoff strategy

## Bonus Features (Optional)

These bonus features earn additional points:

**User Experience:**
- Creative UI with unique "wow" factor
- Skeleton loaders for all loading states ✅
- Empty state with helpful messaging ✅
- Mobile responsiveness ✅
- Additional features that enhance the project

**Technical Excellence:**
- Proper error handling (network failures, rate limiting, invalid responses) ✅
- Race condition handling ✅
- Unit or integration tests

## Important Conventions

1. **Redux hooks:** Always use `useAppDispatch` and `useAppSelector` from `src/app/hooks.ts`
2. **Slice naming:** Feature slices use `[feature]Slice.ts` pattern
3. **Component structure:** Features organized in `src/features/[feature-name]/`
4. **No class components:** Only functional components with hooks
5. **Type safety:** Minimal use of `any` type
6. **Request cancellation:** Always implement for search functionality
7. **Debouncing:** 250ms for search input (required)
8. **Port 4000:** Dev server must run on this port

## Evaluation Criteria

Your submission will be evaluated on:

1. **Correct Implementation** - All features work as described, proper routing, and state management
2. **TypeScript Usage** - Proper typing throughout with minimal 'any' types
3. **Code Organization** - Logical folder structure, reusable components, clear separation of concerns
4. **Code Quality** - Clean, well-formatted code following React and TypeScript best practices
5. **React Best Practices** - Proper hook usage, avoiding anti-patterns, efficient re-rendering

## Development Workflow

1. **Before starting a new feature:**
   - Review relevant sections in this document
   - Check clean code principles
   - Plan component structure

2. **During development:**
   - Write small, focused functions
   - Use descriptive names
   - Keep abstraction levels consistent
   - Test frequently

3. **Before committing:**
   - Run `npm run lint:fix`
   - Run `npm run format`
   - Run `npm run type-check`
   - Test all features manually

## Common Pitfalls to Avoid

1. ❌ Not cancelling in-flight requests
2. ❌ Not implementing debouncing
3. ❌ Using `any` type excessively
4. ❌ Creating God components (too many responsibilities)
5. ❌ Ignoring loading and error states
6. ❌ Not handling edge cases (empty results, API errors)
7. ❌ Mixing concerns (API calls in components)
8. ❌ Using `var` instead of `const`/`let`
9. ❌ Not respecting Jikan API rate limits
10. ❌ Deploying without testing on port 4000

## Quick Reference

**Jikan API Base URL:**
```
https://api.jikan.moe/v4
```

**Rate Limits:**
- 30 requests/minute
- 2 requests/second

**Key Routes:**
- `/` - Search page
- `/anime/:id` - Detail page

**Dev Server Port:**
- 4000 (required)

---

**Remember:** Write code that is clear, maintainable, and follows the clean code principles. Quality over speed. Make each commit meaningful and atomic.