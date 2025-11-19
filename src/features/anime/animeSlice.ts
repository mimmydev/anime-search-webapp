import { createAppSlice } from '@/app/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SearchState = {
  query: string
  currentPage: number
  resultsPerPage: number
  hasSearched: boolean
}

const initialState: SearchState = {
  query: '',
  currentPage: 1,
  resultsPerPage: 20,
  hasSearched: false,
}

export const animeSlice = createAppSlice({
  name: 'animeSearch',
  initialState,
  reducers: create => ({
    setQuery: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.query = action.payload
        state.currentPage = 1 // Reset to first page when query changes
      }
    ),
    
    setPage: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload
      }
    ),
    
    setResultsPerPage: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.resultsPerPage = action.payload
        state.currentPage = 1 // Reset to first page when results per page changes
      }
    ),
    
    setHasSearched: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.hasSearched = action.payload
      }
    ),
    
    clearSearch: create.reducer(state => {
      state.query = ''
      state.currentPage = 1
      state.hasSearched = false
    }),
  }),
  selectors: {
    selectQuery: state => state.query,
    selectCurrentPage: state => state.currentPage,
    selectResultsPerPage: state => state.resultsPerPage,
    selectHasSearched: state => state.hasSearched,
    selectSearchParams: state => ({
      q: state.query,
      page: state.currentPage,
      limit: state.resultsPerPage,
    }),
  },
})

export const {
  setQuery,
  setPage,
  setResultsPerPage,
  setHasSearched,
  clearSearch,
} = animeSlice.actions

export const {
  selectQuery,
  selectCurrentPage,
  selectResultsPerPage,
  selectHasSearched,
  selectSearchParams,
} = animeSlice.selectors
