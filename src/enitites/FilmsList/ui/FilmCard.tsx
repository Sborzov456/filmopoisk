import React from 'react';
import { Film } from '../model/Film';
import { Card } from '../../../shared/ui';
import './style.scss'

type FilmCardProps = Film;

export default function FilmCard({ title, genre, release_year, poster, description }: FilmCardProps) {
    console.log(description)
    return (
        <Card className='film-card'>
            <img src={poster}/>
            <h2>{title}</h2>
            <div>Жанр: {genre}</div>
            <div>Год: {release_year}</div>
            {/* <div className='description'> Описание: {description}</div> */}
        </Card>
    );
}
