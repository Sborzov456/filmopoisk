import { useReducer } from 'react';
import './style.scss';
import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import { authByLogin } from '../api/loginApi';
import { useAppDispatch, useAppSelector } from '@/app';
import { setUser } from '@/enitites/user';
import { selectAuthStatus } from '../model/store';
import Loader from '@/shared/ui/loader/Loader';

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
    const authStatus = useAppSelector(selectAuthStatus);

    if (authStatus === 'loaded') {
        dispatch(setUser({ username: loginForm.username, isLogin: true }));
        onLogin && onLogin();
    }

    const onLoginButtonClick = async () => {
        dispatch(authByLogin(loginForm));
    };

    return (
        <div className='ui-login'>
            {authStatus !== 'loading' ? (
                <>
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
                </>
            ) : (
                <Loader />
            )}
            <Button className='login-button' onClick={onLoginButtonClick}>
                Войти
            </Button>
        </div>
    );
}
