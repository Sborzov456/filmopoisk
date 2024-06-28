import { configureStore } from '@reduxjs/toolkit'
import { filmsApi } from '../../enitites/films-list/api/filmsApi'

export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmsApi.middleware),
})