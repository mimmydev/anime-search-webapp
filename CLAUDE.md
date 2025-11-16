# CLAUDE.md

<!-- PERSONA & ROLE (Component 1: Task Description) -->
You are a senior React engineer specializing in:
- Clean code principles and SOLID design patterns
- Modern React 19 with TypeScript and Redux Toolkit
- RESTful API integration with proper error handling
- Production-quality code that is maintainable and testable

Your outputs must be immediately runnable, follow industry best practices, and demonstrate expert-level architectural decisions.

---

<!-- CRITICAL CONTEXT - BEGINNING (Component 4: Context at start for position bias) -->

## ⚡ Critical Requirements (MUST FOLLOW)

### Tech Stack (Required)
```
React 19 + TypeScript (hooks only, no class components)
Redux Toolkit (state management - required)
React Router DOM (navigation)
Vite (build tool, port 4000)
Tailwind CSS v4 (styling)
shadcn/ui - New York variant (UI components)
Jikan API v4 (data source)
```

### Non-Negotiable Constraints
- ✅ npm only (no yarn/pnpm) - must run with: `npm install && npm run dev`
- ✅ Port 4000 (dev server must start on this port)
- ✅ No environment variables (app works immediately after install)
- ✅ No Next.js (SPA only)
- ✅ TypeScript with minimal `any` usage
- ✅ Hooks only - absolutely no class components

### Code Quality Standards (Clean Code)
```
✅ Functions: verb phrases (fetchAnimeList, handleSearch)
✅ Components: noun phrases (AnimeCard, SearchResults)
✅ Single responsibility - one thing per function
✅ Single abstraction level per function
✅ No flag arguments - split into separate functions
✅ Never use `var` - only const/let
✅ Never pass/return null - use empty state objects
✅ No train wrecks - avoid method chaining
✅ Extract duplicated code into reusable functions
```

---

<!-- THE TASK (Component 2: Concrete task) -->

## 🎯 Project: Anime Search App

Build a two-page React application for searching and viewing anime details.

### Page 1: Search Page (Route: `/`)

**Features Required:**
1. Search input with 250ms debouncing (required)
2. Instant search - no submit button needed
3. Cancel in-flight API requests when user continues typing (required)
4. Display anime search results in a grid layout
5. Server-side pagination with page controls
6. Skeleton loaders during loading state
7. Empty state with helpful message when no results
8. Click anime card → navigate to detail page

**State Management:**
```typescript
// Redux slice: src/features/anime/animeSlice.ts
{
  searchResults: Anime[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  loading: boolean;
  error: string | null;
}
```

### Page 2: Detail Page (Route: `/anime/:id`)

**Features Required:**
1. Display detailed anime information (title, synopsis, score, episodes, etc.)
2. Show anime poster image
3. Display genres as badges
4. Show airing status and dates
5. Skeleton loader while fetching data
6. Error state if anime not found
7. Back button to return to search

**State Management:**
```typescript
// Redux slice: src/features/anime/animeDetailSlice.ts
{
  animeDetails: Record<number, AnimeDetail>; // Cache by ID
  currentAnimeId: number | null;
  loading: boolean;
  error: string | null;
}
```

---

## 🌐 Jikan API v4 Reference

### Base URL
```
https://api.jikan.moe/v4
```

### Rate Limits (CRITICAL)
```
⚠️ 30 requests per minute
⚠️ 2 requests per second
Must implement request cancellation to avoid waste
```

### Search Endpoint
```typescript
GET /anime?q={query}&page={page}&limit={limit}

// Example
https://api.jikan.moe/v4/anime?q=naruto&page=1&limit=20

// Response Shape
{
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
  data: Array<{
    mal_id: number;
    title: string;
    images: {
      jpg: { image_url: string; }
    };
    synopsis: string;
    type: string;
    episodes: number;
    score: number;
    genres: Array<{ name: string; }>;
  }>
}
```

### Detail Endpoint
```typescript
GET /anime/{id}

// Example
https://api.jikan.moe/v4/anime/1

// Response Shape
{
  data: {
    mal_id: number;
    title: string;
    title_english: string;
    title_japanese: string;
    images: { jpg: { large_image_url: string; } };
    synopsis: string;
    score: number;
    episodes: number;
    status: string;
    aired: { string: string; };
    genres: Array<{ name: string; }>;
    // ... more fields
  }
}
```

---

<!-- CHAIN-OF-THOUGHT INSTRUCTION (Component: CoT Prompting) -->

## 🧠 Implementation Approach (Think Step-by-Step)

Before writing code, please:

1. **Analyze Requirements**
   - Identify all technical constraints
   - Map out component hierarchy
   - Plan Redux slice structure
   - Identify edge cases (empty results, API errors, rate limits)

2. **Design Architecture**
   - Determine file structure
   - Plan component responsibilities (single responsibility principle)
   - Design data flow (props vs Redux state)
   - Identify shared logic for custom hooks

3. **Identify Technical Challenges**
   - How to implement 250ms debouncing?
   - How to cancel in-flight requests?
   - How to handle Jikan API rate limits?
   - How to cache anime details?
   - How to manage loading/error states?

4. **Plan Implementation Order**
   - Set up routing and Redux store
   - Build API service layer with cancellation
   - Implement search page with debouncing
   - Add pagination
   - Build detail page
   - Add loading states and error handling
   - Polish UI with shadcn/ui components

5. **Then Execute Step-by-Step**
   - Build one feature at a time
   - Test each feature before moving to next
   - Ensure clean code principles throughout

---

<!-- EXAMPLES (Component 3: Few-Shot Learning) -->

## 📚 Code Quality Examples

### Naming Conventions

**Components (Noun Phrases):**
```typescript
✅ GOOD: AnimeCard, SearchResults, PaginationControls, ErrorBoundary
❌ BAD: AnimeManager, ProcessAnime, HandleData, Stuff
```

**Functions (Verb Phrases):**
```typescript
✅ GOOD: fetchAnimeList, handleSearch, formatDate, cancelRequest
❌ BAD: anime, search, date, request
```

**Accessors/Mutators (get/set/is prefix):**
```typescript
✅ GOOD: getSearchQuery, setCurrentPage, isLoading
❌ BAD: searchQuery(), currentPage(), loading()
```

### Single Responsibility

**❌ BAD - Multiple Responsibilities:**
```typescript
function handleSearchAndPagination(query: string, isNextPage: boolean) {
  if (isNextPage) {
    dispatch(nextPage());
  } else {
    dispatch(searchAnime(query));
  }
}
```

**✅ GOOD - Split into Two Functions:**
```typescript
function handleSearch(query: string) {
  dispatch(searchAnime(query));
}

function handleNextPage() {
  dispatch(nextPage());
}
```

### Single Abstraction Level

**❌ BAD - Mixing Abstraction Levels:**
```typescript
function displayAnime(anime: Anime) {
  const html = `<div>${anime.title}</div>`; // Low level
  renderToScreen(html); // High level
}
```

**✅ GOOD - Consistent Abstraction:**
```typescript
function displayAnime(anime: Anime) {
  const card = createAnimeCard(anime);
  renderCard(card);
}
```

### No Null Returns

**❌ BAD - Returning Null:**
```typescript
function findAnime(id: number): Anime | null {
  return animeList.find(a => a.id === id) || null;
}
```

**✅ GOOD - Use Empty State Object:**
```typescript
const EMPTY_ANIME: Anime = {
  mal_id: 0,
  title: 'Not Found',
  images: { jpg: { image_url: '' } },
  synopsis: 'Anime not found',
  // ... other required fields
};

function findAnime(id: number): Anime {
  return animeList.find(a => a.id === id) || EMPTY_ANIME;
}
```

### Avoid Train Wrecks (Law of Demeter)

**❌ BAD - Method Chaining:**
```typescript
const url = anime.images.jpg.image_url;
```

**✅ GOOD - Encapsulate Logic:**
```typescript
function getAnimeImageUrl(anime: Anime): string {
  return anime.images.jpg.image_url;
}

const url = getAnimeImageUrl(anime);
```

---

## 📁 Required File Structure

Create this exact structure:

```
src/
├── app/
│   ├── store.ts              # Redux store with combineSlices()
│   ├── hooks.ts              # Pre-typed useAppDispatch & useAppSelector
│   └── createAppSlice.ts     # Custom slice creator
├── features/
│   └── anime/
│       ├── components/
│       │   ├── AnimeCard.tsx          # Single anime card component
│       │   ├── AnimeGrid.tsx          # Grid layout for results
│       │   ├── SearchBar.tsx          # Search input with debouncing
│       │   ├── Pagination.tsx         # Page navigation controls
│       │   └── EmptyState.tsx         # No results message
│       ├── pages/
│       │   ├── SearchPage.tsx         # Page 1: Search & results
│       │   └── DetailPage.tsx         # Page 2: Anime details
│       ├── animeSlice.ts              # Search state & actions
│       ├── animeDetailSlice.ts        # Detail state & actions
│       ├── animeApi.ts                # Jikan API service layer
│       └── types.ts                   # TypeScript interfaces
├── components/
│   ├── ui/                   # shadcn/ui components (button, card, etc.)
│   └── layout/
│       ├── Header.tsx        # App header with logo
│       └── ErrorBoundary.tsx # Error boundary wrapper
├── hooks/
│   └── useDebounce.ts        # Debounce hook (250ms)
├── lib/
│   └── utils.ts              # cn() utility for Tailwind
├── router/
│   └── index.tsx             # React Router setup
├── types/
│   └── api.ts                # Shared API types
└── main.tsx                  # App entry point
```

---

## 🔧 Critical Implementation Patterns

### 1. Debouncing (Required)

```typescript
// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage in SearchBar component
const debouncedQuery = useDebounce(searchQuery, 250);

useEffect(() => {
  if (debouncedQuery) {
    dispatch(searchAnime({ query: debouncedQuery, page: 1 }));
  }
}, [debouncedQuery, dispatch]);
```

### 2. Request Cancellation (Required)

```typescript
// In Redux thunk - src/features/anime/animeSlice.ts
export const searchAnime = createAsyncThunk(
  'anime/search',
  async ({ query, page }: SearchParams, { signal }) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=20`,
      { signal } // Pass AbortController signal
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  }
);

// Redux Toolkit automatically cancels previous requests
// when a new request with the same action type is dispatched
```

### 3. Error Handling Pattern

```typescript
try {
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment.');
    }
    throw new Error(`API Error: ${response.status}`);
  }
  
  return await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    // Request cancelled - ignore silently
    return;
  }
  // Re-throw other errors for Redux to handle
  throw error;
}
```

### 4. Redux Hooks (Always Use Pre-typed)

```typescript
// ❌ NEVER import from react-redux directly
import { useDispatch, useSelector } from 'react-redux';

// ✅ ALWAYS import from app/hooks.ts
import { useAppDispatch, useAppSelector } from '@/app/hooks';

// Usage
const dispatch = useAppDispatch();
const results = useAppSelector(state => state.anime.searchResults);
```

---

## 🎨 shadcn/ui Components to Use

Install and use these components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add skeleton
npx shadcn@latest add badge
```

**Import Pattern:**
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
```

**Styling Utility:**
```typescript
import { cn } from '@/lib/utils';

// Combine Tailwind classes conditionally
<div className={cn('base-classes', isActive && 'active-classes')} />
```

---

## 🚀 Development Commands

```bash
# Start dev server on port 4000
npm run dev
npm start

# Build production
npm run build

# Run tests
npm test

# Linting & formatting
npm run lint
npm run lint:fix
npm run format
npm run type-check
```

---

## ✅ Evaluation Criteria

Your code will be evaluated on:

1. **Correct Implementation** (30%)
   - All features work as specified
   - Proper routing between pages
   - Redux state management working correctly

2. **TypeScript Usage** (20%)
   - Proper types throughout
   - Minimal use of `any`
   - Interface definitions for API responses

3. **Code Organization** (20%)
   - Logical folder structure
   - Reusable components
   - Clear separation of concerns

4. **Code Quality** (20%)
   - Clean, well-formatted code
   - Follows naming conventions
   - Single responsibility functions
   - No code duplication

5. **React Best Practices** (10%)
   - Proper hook usage
   - Efficient re-rendering
   - No anti-patterns

---

<!-- CRITICAL REMINDERS - END (Position bias: most important at end) -->

## ⚠️ CRITICAL REMINDERS (Must Verify)

Before considering the implementation complete, verify:

1. ✅ **250ms debouncing** implemented for search input
2. ✅ **Request cancellation** working for in-flight API calls
3. ✅ **Port 4000** configured in vite.config.ts
4. ✅ **No class components** - only functional components with hooks
5. ✅ **Redux Toolkit** used for all state management
6. ✅ **useAppDispatch & useAppSelector** used (never raw react-redux hooks)
7. ✅ **TypeScript** with minimal `any` types
8. ✅ **Skeleton loaders** shown during API calls
9. ✅ **Empty state** shown when no search results
10. ✅ **Error handling** for API failures and rate limits
11. ✅ **No environment variables** - runs immediately after npm install
12. ✅ **Clean code principles** followed throughout (naming, SRP, no null returns)

### Port 4000 Configuration

**Must add to vite.config.ts:**
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    strictPort: true, // Fail if port unavailable
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Common Pitfalls to Avoid

1. ❌ Not cancelling in-flight requests
2. ❌ Not implementing 250ms debouncing
3. ❌ Using `var` instead of `const`/`let`
4. ❌ Creating components with multiple responsibilities
5. ❌ Using raw react-redux hooks instead of pre-typed ones
6. ❌ Returning `null` instead of empty state objects
7. ❌ Missing loading states or error handling
8. ❌ Not respecting Jikan API rate limits
9. ❌ Using `any` type excessively
10. ❌ Wrong dev server port (must be 4000)

---

## 🎓 Philosophy: Code as Communication

Remember: Code is read far more often than it is written. Every component, function, and variable name is an opportunity to communicate intent clearly. Follow these principles, and the resulting codebase will be:

- **Maintainable** - Easy to modify and extend
- **Testable** - Easy to write tests for
- **Understandable** - Clear to any developer reading it
- **Professional** - Production-ready quality

Write code that your future self (and your evaluators) will thank you for.