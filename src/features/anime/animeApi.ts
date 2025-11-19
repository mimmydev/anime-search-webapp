import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { SearchResponse, SearchParams, DetailResponse } from './types'

// Rate limiting configuration
const RATE_LIMIT_DELAY = 500 // 500ms between requests (2 per second)
const MAX_REQUESTS_PER_MINUTE = 30

let lastRequestTime = 0
let requestCount = 0
let requestCountResetTime = Date.now()

// Rate limiting middleware
const rateLimitMiddleware = async () => {
  const now = Date.now()
  
  // Reset request count every minute
  if (now - requestCountResetTime > 60000) {
    requestCount = 0
    requestCountResetTime = now
  }
  
  // Check if we've exceeded the minute limit
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    const waitTime = 60000 - (now - requestCountResetTime)
    await new Promise(resolve => setTimeout(resolve, waitTime))
    requestCount = 0
    requestCountResetTime = Date.now()
  }
  
  // Ensure minimum delay between requests
  const timeSinceLastRequest = now - lastRequestTime
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest))
  }
  
  lastRequestTime = Date.now()
  requestCount++
}

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jikan.moe/v4',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Anime', 'AnimeDetail'],
  endpoints: (builder) => ({
    searchAnime: builder.query<SearchResponse, SearchParams>({
      query: ({ q, page = 1, limit = 20 }) => ({
        url: '/anime',
        params: { q, page, limit },
      }),
      providesTags: ['Anime'],
      // Custom query implementation with rate limiting
      extraOptions: {
        customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
          await rateLimitMiddleware()
          return fetch(input, init)
        },
      },
    }),
    getAnimeById: builder.query<DetailResponse, number>({
      query: (id) => `/anime/${String(id)}`,
      providesTags: (_result, _error, id) => [{ type: 'AnimeDetail', id: id }],
      // Custom query implementation with rate limiting
      extraOptions: {
        customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
          await rateLimitMiddleware()
          return fetch(input, init)
        },
      },
    }),
  }),
})

// Export hooks for usage in components
export const { useSearchAnimeQuery, useGetAnimeByIdQuery } = animeApi

// Export the API slice for store configuration
export { animeApi as animeApiSlice }
