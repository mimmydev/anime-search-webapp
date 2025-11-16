# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application using Redux Toolkit for state management and shadcn/ui for UI components. The project is based on the Redux Vite template and has been extended with Tailwind CSS v4 and shadcn/ui components.

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

## Architecture

### Redux Store Structure

The application uses Redux Toolkit with a modular slice-based architecture:

- **Store setup**: `src/app/store.ts` - Uses `combineSlices()` to automatically combine reducers, includes `makeStore()` factory for testing
- **Slice creation**: `src/app/createAppSlice.ts` - Custom slice creator with built-in async thunk support using `buildCreateSlice()`
- **Pre-typed hooks**: `src/app/hooks.ts` - Exports `useAppDispatch` and `useAppSelector` with proper TypeScript types. **Always use these instead of the raw react-redux hooks** (enforced by ESLint rule)

### State Management Patterns

1. **Standard slices**: Use `createAppSlice()` for features with async logic (see `src/features/counter/counterSlice.ts`)
   - Supports both sync reducers and async thunks in the same `reducers` field
   - Co-locate selectors with slices using the `selectors` field

2. **RTK Query**: Use `createApi()` for API data fetching (see `src/features/quotes/quotesApiSlice.ts`)
   - Auto-generates hooks for queries (`useGetQuotesQuery`)
   - Middleware must be added to store configuration
   - Use tag-based cache invalidation

### Testing

- **Test utilities**: `src/utils/test-utils.tsx` provides `renderWithProviders()` for testing Redux-connected components
- **Setup**: `src/setupTests.ts` configures the test environment
- **Test files**: Co-locate tests with features (e.g., `counterSlice.test.ts`)
- Tests run with Vitest in jsdom environment with globals enabled

### UI Components

- **shadcn/ui**: Installed with "new-york" style variant in `src/components/ui/`
- **Styling**: Uses `cn()` utility from `src/lib/utils.ts` to merge Tailwind classes with class-variance-authority
- **Path aliases**: `@/` maps to `src/` (configured in tsconfig.json and vite.config.ts)
- **Icons**: Uses lucide-react for icons

### TypeScript Configuration

- **Type imports**: Enforced to use `import type` syntax with separate type imports
- **Type definitions**: Prefer `type` over `interface` (enforced by ESLint)
- **Path aliases**: `@/*` resolves to `src/*`

## Important Conventions

1. **Redux hooks**: Always import `useAppDispatch` and `useAppSelector` from `src/app/hooks.ts`, not from `react-redux` directly
2. **Slice naming**: Feature slices should use the pattern `[feature]Slice.ts` and API slices should use `[feature]ApiSlice.ts`
3. **Reducers and selectors**: Keep them co-located within slice definitions
4. **Component structure**: Features are organized in `src/features/[feature-name]/` with their own components, slices, and tests
