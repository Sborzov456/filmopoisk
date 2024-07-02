import { configureStore } from '@reduxjs/toolkit'
import { filmsApi } from '../../enitites/film/api/filmsApi'
import { userReducer } from '@/enitites/user'
import { authReducer } from '@/features/login/model/store'

export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

