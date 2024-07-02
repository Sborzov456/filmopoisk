import React from 'react';
import { Film } from '../../model/Film';
import { Card } from '@/shared/ui';
import './style.scss';
import Rating from '@/shared/ui/rating/Rating';
import { useSelector } from 'react-redux';
import {  selectUser } from '@/enitites/user';
import { filmsApi } from '../../api/filmsApi';

type FilmCardProps = Film & {
    className?: string;
    children?: React.ReactNode;
    onClick?: (id: number) => void;
    isRating?: boolean;
};

function updateMovieRating(username: string, movieId: number, rating: number) {
    const ratings = JSON.parse(localStorage.getItem(username) ?? '{}');
    ratings[movieId] = rating;
    localStorage.setItem(username, JSON.stringify(ratings));
}

function getCurrentRating(username: string, id: number) {
    return Number(JSON.parse(localStorage[username] || '{}')[id]) ?? 0;
}

export function FilmCard({
    id,
    title,
    genre,
    release_year,
    poster,
    rating,
    description,
    className,
    children,
    isRating = false,
    onClick,
}: FilmCardProps) {
    const user = useSelector(selectUser);
    const [rateMovie, { data }] = filmsApi.useRateMovieMutation();
    return (
        <Card className={`${className} film-card`} onClick={() => onClick && onClick(id)}>
            <img src={poster} />
            <h2>{title}</h2>
            {user.isLogin ? (
                <Rating
                    rating={getCurrentRating(user.username, id)}
                    onChange={rating => {
                        updateMovieRating(user.username, id, rating);
                        rateMovie({ id, rate: rating });
                    }}
                />
            ) : (
                <div></div>
            )}
            <table>
                <tbody>
                    <tr>
                        <td className='property'>Жанр</td>
                        <td> {genre} </td>
                    </tr>
                    {isRating ? (
                        <tr>
                            <td className='property'>Рейтинг</td>
                            <td> {data?.newAverageRate ?? rating} </td>
                        </tr>
                    ) : (
                        <></>
                    )}
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
            {children}
        </Card>
    );
}
