import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Film } from '../model/Film';
import { Filters } from '../model/Filters';
import { API_BASE_URL } from '@/shared/constants/constants';
import { Actor } from '../model/Actor';

type GetFilmsQuery = {
    page?: number;
    limit?: number;
    filters?: Filters
}

export type GetFilmsResponse = {
    search_result: Film[];
    total_pages: number
}

export type GetFilmQuery = {
    id: number;
}

export type RateFilmQuery = {
    id: number,
    rate: number,
}

export type RateFilmResponse = {
    movieId: number;
    newAverageRate: number;
    newTotalRatesCount: number;
}

export type GetFilmResponse = Film & {actors: Actor[]}

export const filmsApi = createApi({
    reducerPath: 'filmsApi',
    baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
    tagTypes: ['film', 'films'],
    endpoints: (build) => ({
        getFilm: build.query<GetFilmResponse, GetFilmQuery>({
            query: (params) => ({
                url: `movie/${params.id}`
            }),
            providesTags: (result) => [{ type: 'film', id: result?.id}],
        }),
        getFilms: build.query<GetFilmsResponse, GetFilmsQuery | void>({
            query: (params) => ({
                url: 'search/',
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    ...(params?.filters || {})
                }
            }),
            providesTags: () => ['films'],
        }),
        rateMovie: build.mutation<RateFilmResponse, RateFilmQuery>({
            query: ({id, rate}) => ({
                url: `rateMovie`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authtorization': `Bearer ${localStorage.token}`,
                },
                body: {
                    movieId: id,
                    user_rate: rate
                }
            }),
            invalidatesTags: (result) => [{ type: 'film', id: result?.movieId}]
        }),
    })
});

