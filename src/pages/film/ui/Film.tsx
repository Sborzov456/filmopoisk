import { FilmCard } from '@/enitites/film';
import { filmsApi } from '@/enitites/film/api/filmsApi';
import ActorsBar from '@/enitites/film/ui/actors-bar/ActorsBar';
import { omit } from '@/shared/lib/omit';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';
import Loader from '@/shared/ui/loader/Loader';

export function Film() {
    const location = useLocation();
    const filmId = location.pathname.split('/').at(-1);
    const { data: film, error, isLoading } = filmsApi.useGetFilmQuery({ id: Number(filmId) });

    if (isLoading) {
        return <Loader/>;
    }
    if (error) {
        return <div>Error occurred</div>;
    }
    if (!film) {
        return <div> No Films </div>;
    }

    return (
        <div className='film-page'>
            <FilmCard className='full-page' {...(omit(film, 'actors') as Omit<typeof film, 'actors'>)} isRating={true}/>
            <div className='actors-panel'>
                <h2> Актеры </h2>
                <ActorsBar actors={film.actors} />
            </div>
        </div>
    );
}
