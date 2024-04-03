import { configureStore } from '@reduxjs/toolkit'
import quotesReducer from './quotesSlice'
import {quotesApi} from "./quotesApi.js";

export const store = configureStore({
  reducer: {
    quotesState: quotesReducer,
    [quotesApi.reducerPath]: quotesApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    quotesApi.middleware
  )
})
