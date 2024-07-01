import React, { useState } from 'react';
import { filmsApi } from '../../api/filmsApi';
import {FilmCard} from '../film-card/FilmCard';
import './style.scss';
import { Filters } from '../../model/Filters';
import IconButton from '../../../../shared/ui/icon-button/IconButton';
import leftArrowIcon from '@/shared/icons/left-arrow.svg';
import rightArrowIcon from '@/shared/icons/right-arrow.svg';
import useDebounce from '@/shared/hooks/useDebounce';
import Input from '@/shared/ui/input/Input';
import searchIcon from '@/shared/icons/search.svg';
import { canDecreasePage, canIncreasePage } from '../../lib/paginationHelpers';
import { useNavigate } from 'react-router-dom';

export type FilmsListProps = {
    style?: React.CSSProperties;
    className?: string;
    filters?: Filters;
};

export function FilmsList({ style, className, filters }: FilmsListProps) {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce<typeof search>(search, 300);
    const {
        data: films,
        error,
        isLoading,
    } = filmsApi.useGetFilmsQuery({
        page,
        filters: Object.assign({ ...(filters ?? {}) }, debouncedSearch ? { title: debouncedSearch } : {}),
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error occurred</div>;
    }
    if (!films?.search_result.length) {
        return <div> No Films </div>;
    }
    return (
        <div className={`films-list ${className}`} style={style}>
            <Input className='films-search' onChange={(value: string) => setSearch(value)} icon={searchIcon} />
            <div style={{ overflowY: 'scroll', height: 'calc(100vh - 160px - 88px)' }}>
                {films?.search_result?.map(el => (
                    <React.Fragment key={el.id}>
                        <FilmCard onClick={(id: number) => navigate(`/film/${id}`)} className='list-card' {...el} />
                    </React.Fragment>
                ))}
            </div>
            <div className='films-list-pagination'>
                <IconButton className={!canDecreasePage(page) ? 'disabled' : ''} onClick={() => canDecreasePage(page) && setPage(page - 1)} icon={leftArrowIcon} />
                    {page}
                <IconButton className={!canIncreasePage(page, films.total_pages) ? 'disabled' : ''} onClick={() => canIncreasePage(page, films.total_pages) && setPage(page + 1)} icon={rightArrowIcon} />
            </div>
        </div>
    );
}
