import { createAppSlice } from '@/app/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'

export type DetailState = {
  currentId: number | null
  viewedIds: number[]
}

const initialState: DetailState = {
  currentId: null,
  viewedIds: [],
}

export const animeDetailSlice = createAppSlice({
  name: 'animeDetail',
  initialState,
  reducers: create => ({
    setCurrentAnime: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.currentId = action.payload
        // Track viewed anime IDs for potential caching/history
        if (!state.viewedIds.includes(action.payload)) {
          state.viewedIds.push(action.payload)
        }
      }
    ),
    
    clearCurrentAnime: create.reducer(state => {
      state.currentId = null
    }),
    
    clearViewedHistory: create.reducer(state => {
      state.viewedIds = []
    }),
  }),
  selectors: {
    selectCurrentId: state => state.currentId,
    selectViewedIds: state => state.viewedIds,
    selectHasViewedAnime: (state, animeId: number) => 
      state.viewedIds.includes(animeId),
  },
})

export const {
  setCurrentAnime,
  clearCurrentAnime,
  clearViewedHistory,
} = animeDetailSlice.actions

export const {
  selectCurrentId,
  selectViewedIds,
  selectHasViewedAnime,
} = animeDetailSlice.selectors
