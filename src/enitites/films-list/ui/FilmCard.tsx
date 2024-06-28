import React from 'react';
import { Film } from '../model/Film';
import { Card } from '../../../shared/ui';
import './style.scss';

type FilmCardProps = Film;

export default function FilmCard({ title, genre, release_year, poster, description }: FilmCardProps) {
    return (
        <Card className='film-card'>
            <img src={poster} />
            <h2>{title}</h2>
            <table>
                <tbody>
                    <tr>
                        <td className='property'>Жанр</td>
                        <td> {genre} </td>
                    </tr>
                    <tr>
                        <td className='property'>Год</td>
                        <td>{release_year}</td>
                    </tr>
                    <tr>
                        <td className='property'>Описание</td>
                        <td>{description}</td>
                    </tr>
                </tbody>
            </table>
        </Card>
    );
}
