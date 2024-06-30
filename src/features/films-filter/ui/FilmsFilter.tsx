import React, { Key, useEffect, useState } from 'react';
import { Card } from '../../../shared/ui';
import Selector from '../../../shared/ui/selector/Selector';
import { Filters, GENRES, YEARS } from '../../../enitites/film';
import './style.scss';

type FilterValue = {
    key: Key;
    data: Filters['genre'] | Filters['release_year'];
};

type FilmsFilterProps = {
    onFilter?: (filters: Filters) => unknown;
    style?: React.CSSProperties;
    className?: string;
};

export function FilmsFilter({ style, className, onFilter }: FilmsFilterProps) {
    const [filters, setFilters] = useState<Filters | null>(null);
    useEffect(() => {
        if (filters && onFilter) {
            onFilter(filters);
        }
    }, [filters, onFilter]);
    return (
        <Card style={style} className={`films-filter ${className}`}>
            <h3> Фильтр </h3>
            <Selector
                items={Object.keys(GENRES).map(key => ({ key: key, data: GENRES[key as keyof typeof GENRES] }))}
                onChange={data => {
                    (data as FilterValue).key === '0'
                        ? setFilters({ ...filters, genre: undefined })
                        : setFilters({ ...filters, genre: (data as FilterValue).key as Filters['genre'] });
                }}
            />
            <Selector
                items={Object.keys(YEARS).map(key => ({ key: key, data: YEARS[key as keyof typeof YEARS] }))}
                onChange={data => {
                    (data as FilterValue).key !== '0'
                        ? setFilters({ ...filters, release_year: undefined })
                        : setFilters({
                              ...filters,
                              release_year: (data as FilterValue).key as Filters['release_year'],
                          });
                }}
            />
        </Card>
    );
}
