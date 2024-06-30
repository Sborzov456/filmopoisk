import React, { useState } from 'react';
import { FilmsList } from '../../../enitites/film';
import { FilmsFilter, Filters } from '../../../features/films-filter';
import './style.scss';

export function Films() {
    const [filters, setFilters] = useState<Filters>();
    return (
        <div className='films-page-layout'>
            <FilmsFilter
                className='films-filter'
                onFilter={filters => {
                    setFilters(filters);
                }}
            />
            <FilmsList className='films-list' filters={filters} />
        </div>
    );
}
