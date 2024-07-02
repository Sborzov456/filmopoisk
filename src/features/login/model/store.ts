import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authByLogin } from '../api/loginApi';
import { Token } from '../api/loginApi';
import { RootState } from '@/app';

type AuthState = {
    status: 'idle' | 'loading' | 'loaded' | 'failed';
};
const initialState: AuthState = {
    status: 'idle',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authByLogin.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(authByLogin.fulfilled, (state, action: PayloadAction<Token>) => {
            state.status = 'loaded';
            localStorage.token = action.payload;
        });
        builder.addCase(authByLogin.rejected, state => {
            state.status = 'failed';
        });
    },
});

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const authReducer = authSlice.reducer;
