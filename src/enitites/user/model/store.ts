import { RootState } from '@/app';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    username: string;
    isLogin: boolean;
}

const initialState = { 
    username: localStorage['username'] ?? '', 
    isLogin: localStorage['token']
} satisfies UserState as UserState;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.isLogin = action.payload.isLogin;
            state.username = action.payload.username;
            localStorage['username'] = action.payload.username;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
            if (localStorage['token'] && !action.payload) {
                localStorage['token'] = null;
            }
        }
    },
});

export const { setUsername, setIsLogin, setUser } = userSlice.actions
export const selectUser = (state: RootState) => state.user;
export const userReducer = userSlice.reducer;
