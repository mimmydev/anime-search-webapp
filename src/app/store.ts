import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"

// NOTE `combineSlices` will be used when we add anime slices. For now, we'll start with an empty root reducer
const rootReducer = {
  // TODO: Anime slices will be added here
}

// NOTE: Infer the `RootState` type from the root reducer
export type RootState = typeof rootReducer

// NOTE: The store setup is wrapped in `makeStore` to allow reuse and when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // TODO: API middleware will be added when we implement anime API
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
    },
    preloadedState,
  })
  return store
}

export const store = makeStore()

// NOTE: Infer the type of `store`
export type AppStore = typeof store
// NOTE: Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
