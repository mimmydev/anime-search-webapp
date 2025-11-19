# Anime Search Web App

A modern React application for searching and viewing anime details using the Jikan API (MyAnimeList unofficial API).

## Prerequisites

### Required Versions

- **Node.js**: >= 24.11.1
- **npm**: >= 11.6.2

### Version Management

This project uses **nvm** (Node Version Manager) for version consistency. The required Node.js version is specified in the `.nvmrc` file.

#### Setup with nvm

```bash
# Install and use the correct Node.js version
nvm install
nvm use

# Verify versions
npm run check-versions
```

#### Manual Setup

If you're not using nvm, ensure you have the required versions:

```bash
# Check your versions
node --version  # Should be >= 24.11.1
npm --version   # Should be >= 11.6.2
```

## Installation

```bash
# Clone the repository
git clone https://github.com/mimmydev/anime-search-webapp.git
cd anime-search-webapp

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start on **port 4000** and automatically open in your browser.

## Available Scripts

- `npm run dev` / `npm start` - start dev server on port 4000
- `npm run build` - build for production
- `npm run preview` - locally preview production build
- `npm run test` - run tests
- `npm run lint` - run ESLint
- `npm run lint:fix` - fix ESLint issues
- `npm run format` - format code with Prettier
- `npm run format:check` - check code formatting
- `npm run type-check` - run TypeScript type checking
- `npm run check-versions` - verify Node.js and npm versions

## Technology Stack

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **Vite** as build tool
- **Tailwind CSS v4** for styling
- **shadcn/ui** for UI components
- **Jikan API v4** for anime data

## Features

- **Search Page**: Instant anime search with debouncing and pagination
- **Detail Page**: Detailed anime information with route-based navigation
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Proper error states and messages

## API Integration

This app uses the [Jikan API v4](https://api.jikan.moe/v4) (unofficial MyAnimeList API):

- **Rate Limits**: 30 requests per minute, 2 requests per second
- **Request Cancellation**: Cancels in-flight requests when user continues typing
- **Debouncing**: 250ms delay for search input

## Project Structure

```
src/
├── app/                    # Redux store and configuration
├── components/ui/          # Reusable UI components (shadcn/ui)
├── features/anime/         # Anime-specific features
│   ├── components/         # Anime components
│   ├── pages/             # Page components
│   ├── animeApi.ts        # API integration
│   ├── animeSlice.ts      # Redux slice for search
│   └── animeDetailSlice.ts # Redux slice for details
├── lib/                   # Utility functions
├── router/                # React Router configuration
└── utils/                 # Test utilities
```

## Development Guidelines

- Use **npm only** (no yarn, pnpm, or other package managers)
- Follow TypeScript best practices with minimal `any` usage
- Use hooks only (no class components)
- Implement proper error handling and loading states
- Follow the established component patterns and folder structure

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
