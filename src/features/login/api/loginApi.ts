import { ApiClient } from '@/shared/api/ApiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '@/app/store/store';

type LoginPayload = {
    username: string;
    password: string;
};
export type Token = string;

export const authByLogin = createAsyncThunk<
    Token,
    LoginPayload,
    {
        dispatch: AppDispatch;
    }
>('auth/login', async ({username, password}) => {
    const response = await ApiClient.post({
        url: 'login',
        body: { username, password },
    });
    return response.data.token as Token;
});
