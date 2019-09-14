import { Dispatch } from 'redux';
import api from '@/api';
import { ActionTypes, IGetState } from './types';

export interface IUser {
    id: number;
    username: string;
    email: string;
    avatarUrl: string;
    hashtag: string;
    superAdmin: boolean;
    country: string;
    city: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface IRegisterForm {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface ILoginSuccess {
    token: string;
    user: IUser;
}

export interface ILoginFailure {
    message: string;
}
/**
 * Action dispatched for a successful login or register
 */
export interface ILoginSuccessAction {
    type: ActionTypes.loginSuccess;
    payload: ILoginSuccess;
}

/**
 * Action dispatched for an error during login or register
 */
export interface ILoginErrorAction {
    type: ActionTypes.loginError;
    payload: ILoginFailure;
}

export interface ILogoutAction {
    type: ActionTypes.logout;
}

export const register = (registerProps: IRegisterForm) => async (
    dispatch: Dispatch
) => {
    try {
        const { data } = await api.post<ILoginSuccess>('/users', registerProps);
        dispatch<ILoginSuccessAction>({
            type: ActionTypes.loginSuccess,
            payload: data,
        });
    } catch ({ response: { data } }) {
        dispatch<ILoginErrorAction>({
            type: ActionTypes.loginError,
            payload: data,
        });
    }
};

export const login = (email: string, password: string) => async (
    dispatch: Dispatch
) => {
    try {
        const { data } = await api.post<ILoginSuccess>('/users/token', {
            email,
            password,
        });
        localStorage.setItem('ehToken', data.token);
        dispatch<ILoginSuccessAction>({
            type: ActionTypes.loginSuccess,
            payload: data,
        });
    } catch ({ response: { data } }) {
        dispatch<ILoginErrorAction>({
            type: ActionTypes.loginError,
            payload: data,
        });
    }
};

export const fetchUserSession = () => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;
        if (token) {
            const { data } = await api.get<IUser>('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch<ILoginSuccessAction>({
                type: ActionTypes.loginSuccess,
                payload: {
                    token,
                    user: data,
                },
            });
        }
    } catch ({ response: { data } }) {
        localStorage.removeItem('ehToken');
        dispatch<ILoginErrorAction>({
            type: ActionTypes.loginError,
            payload: data,
        });
    }
};

export const logout = (): ILogoutAction => {
    localStorage.removeItem('ehToken');
    return {
        type: ActionTypes.logout,
    };
};
