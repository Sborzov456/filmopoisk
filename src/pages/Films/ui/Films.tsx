import React, { useState } from 'react';
import { FilmsList } from '../../../enitites/film';
import { FilmsFilter, Filters } from '../../../features/films-filter';
import './style.scss';

export function Films() {
    const [filters, setFilters] = useState<Filters>();
    return (
        <div className='films-page-layout'>
            <FilmsFilter
                onFilter={filters => {
                    setFilters(filters);
                }}
            />
            <FilmsList filters={filters} />
        </div>
    );
}
