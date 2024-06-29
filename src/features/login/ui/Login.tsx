import React, { useReducer } from 'react';
import './style.scss';
import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import { login } from '../api/loginApi';
import { useAppDispatch } from '@/app';
import { setUser } from '@/enitites/user';

type LoginProps = {
    onLogin?: () => void;
};
type LoginForm = {
    username: string;
    password: string;
};
type SetUsernameAction = {
    type: 'SET_USERNAME';
    payload: LoginForm['username'];
};
type SetPasswordAction = {
    type: 'SET_PASSWORD';
    payload: LoginForm['password'];
};
type LoginFromAction = SetUsernameAction | SetPasswordAction;

const loginFormReducer = (state: LoginForm, action: LoginFromAction): LoginForm => {
    switch (action.type) {
        case 'SET_USERNAME': {
            return { ...state, username: action.payload };
        }
        case 'SET_PASSWORD': {
            return { ...state, password: action.payload };
        }
        default: {
            return state;
        }
    }
};

export function Login({ onLogin }: LoginProps) {
    const dispatch = useAppDispatch();
    const [loginForm, dispatchLoginFormAction] = useReducer(loginFormReducer, { username: '', password: '' });

    const onLoginButtonClick = async () => {
        const token = await login(loginForm);
        dispatch(setUser({ username: loginForm.username, isLogin: true }));
        localStorage['token'] = token;
        onLogin && onLogin();
    };
    return (
        <div className='ui-login'>
            <Input
                placeholder='Введите логин'
                label='Логин'
                onChange={value => dispatchLoginFormAction({ type: 'SET_USERNAME', payload: value })}
            />
            <Input
                placeholder='Введите пароль'
                label='Пароль'
                onChange={value => dispatchLoginFormAction({ type: 'SET_PASSWORD', payload: value })}
            />
            <Button className='login-button' onClick={onLoginButtonClick}>
                Войти
            </Button>
        </div>
    );
}
