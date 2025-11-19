import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { animeSlice } from "@/features/anime/animeSlice"
import { animeDetailSlice } from "@/features/anime/animeDetailSlice"
import { animeApiSlice } from "@/features/anime/animeApi"

// NOTE: The store setup is wrapped in `makeStore` to allow reuse and when setting up tests that need the same store config
export const makeStore = () => {
  return configureStore({
    reducer: {
      animeSearch: animeSlice.reducer,
      animeDetail: animeDetailSlice.reducer,
      [animeApiSlice.reducerPath]: animeApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(animeApiSlice.middleware),
  })
}

export const store = makeStore()

// NOTE: Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
