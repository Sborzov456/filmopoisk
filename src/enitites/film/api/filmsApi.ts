import { createApi } from '@reduxjs/toolkit/query/react';
import { Film } from '../model/Film';
import { Filters } from '../model/Filters';
import { Actor } from '../model/Actor';
import { baseQuery } from '@/shared/api/axiosBaseQuery';

type GetFilmsQuery = {
    page?: number;
    limit?: number;
    filters?: Filters;
};

export type GetFilmsResponse = {
    search_result: Film[];
    total_pages: number;
};

export type GetFilmQuery = {
    id: number;
};

export type RateFilmQuery = {
    id: number;
    rate: number;
};

export type RateFilmResponse = {
    movieId: number;
    newAverageRate: number;
    newTotalRatesCount: number;
};

export type GetFilmResponse = Film & { actors: Actor[] };

export const filmsApi = createApi({
    reducerPath: 'filmsApi',
    baseQuery: baseQuery(),
    tagTypes: ['film', 'films'],
    endpoints: build => ({
        getFilm: build.query<GetFilmResponse, GetFilmQuery>({
            query: params => ({
                url: `movie/${params.id}`,
            }),
            providesTags: result => [{ type: 'film', id: result?.id }],
        }),
        getFilms: build.query<GetFilmsResponse, GetFilmsQuery | void>({
            query: params => ({
                url: 'search',
                method: 'get',
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    ...(params?.filters || {}),
                },
            }),
            providesTags: () => ['films'],
        }),
        rateMovie: build.mutation<RateFilmResponse, RateFilmQuery>({
            query: ({ id, rate }) => ({
                url: `rateMovie`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // authorization: `Bearer ${localStorage.token}`,
                },
                body: {
                    movieId: id,
                    user_rate: rate,
                },
            }),
            invalidatesTags: result => [{ type: 'film', id: result?.movieId }],
        }),
    }),
});
