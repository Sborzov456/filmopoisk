import React from 'react';
import './style.scss';
import Button from '@/shared/ui/Button/Button';

export function TopBar() {
    return (
        <div className='top-bar'>
            <h1> Фильмопоиск </h1>
            <Button className='login-button'>Войти</Button>
        </div>
    );
}
