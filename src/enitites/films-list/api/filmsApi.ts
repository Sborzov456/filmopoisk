import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Film } from '../model/Film';
import { Filters } from '../model/Filters';
import { API_BASE_URL } from '@/shared/constants/constants';

type GetFilmsQuery = {
    page?: number;
    limit?: number;
    filters?: Filters
}

export type GetFilmsResponse = {
    search_result: Film[];
    total_pages: number
}

export const filmsApi = createApi({
    reducerPath: 'filmsApi',
    baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
    tagTypes: ['Films'],
    endpoints: (build) => ({
        getFilms: build.query<GetFilmsResponse, GetFilmsQuery | void>({
            query: (params) => ({
                url: 'search/',
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    ...(params?.filters || {})
                }
            }),
            providesTags: () => ['Films'],
        }),
      
    })
});

