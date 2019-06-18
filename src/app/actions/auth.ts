import api from '@/api';
import { IAction } from 'src/typings/states/global';
import {
    LOGIN_ERROR_CREDENTIALS,
    LOGIN_ERROR_MAIL,
    SERVER_ERROR,
    LOGIN_SUCCESS,
} from './types';

export const register = (
    email: string,
    username: string,
    password: string
) => async (dispatch: (source: IAction) => void) => {
    try {
        const {
            data: { token },
        } = await api.post('/users', {
            email,
            username,
            password,
        });
        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch ({ response: { status } }) {
        switch (status) {
            default:
                dispatch({ type: SERVER_ERROR });
                break;
        }
    }
};

export const login = (email: string, password: string) => async (
    dispatch: (source: IAction) => void
) => {
    try {
        const {
            data: { token },
        } = await api.post('/users/token', {
            email,
            password,
        });
        localStorage.setItem('ehToken', token);
        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch ({ response: { status } }) {
        switch (status) {
            case 404:
                dispatch({ type: LOGIN_ERROR_MAIL });
                break;
            case 401:
                dispatch({ type: LOGIN_ERROR_CREDENTIALS });
                break;
            default:
                dispatch({ type: SERVER_ERROR });
                break;
        }
    }
};
