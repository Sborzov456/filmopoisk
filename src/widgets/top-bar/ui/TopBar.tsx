import React, { useState } from 'react';
import './style.scss';
import Button from '@/shared/ui/button/Button';
import { Login } from '@/features/login';
import Modal from '@/shared/ui/modal/Modal';
import { useAppDispatch, useAppSelector } from '@/app';
import { selectUser, setIsLogin } from '@/enitites/user';

export function TopBar() {
    const dispatch = useAppDispatch();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const user = useAppSelector(selectUser);
    return (
        <div className='top-bar'>
            <h1> Фильмопоиск </h1>
            {user.isLogin ? (
                <>
                    {user.username}
                    <Button className='logout-button' onClick={() => dispatch(setIsLogin(false))}>
                        Выйти
                    </Button>
                </>
            ) : (
                <Button className='login-button' onClick={() => setIsLoginOpen(true)}>
                    Войти
                </Button>
            )}

            <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} header='Авторизация'>
                <Login onLogin={() => setIsLoginOpen(false)} />
            </Modal>
        </div>
    );
}
