import { API_BASE_URL } from '../constants/constants';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';

export const baseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params }) => {
        try {
            const response = await axios({
                url: API_BASE_URL + url,
                method,
                params,
                data,
                headers: { Authorization: `Bearer ${localStorage.token}` },
            });
            return response;
        } catch (error) {
            const err = error as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };
