import api from 'app/api';
import { ActionTypes, AppThunk } from './types';
import { ReduxFormValues } from 'app/layouts';
import { persistor } from 'index';
import { sendToast } from 'app/shared';

interface IAuthSuccess {
    token: string;
}

/** LOGIN ACTIONS */
export interface ILoginSuccess {
    type: ActionTypes.loginSuccess;
    token: string;
}

/** REGISTER ACTIONS */
export interface IRegisterSuccess {
    type: ActionTypes.registerSuccess;
    token: string;
}

/** LOGOUT ACTIONS */
export interface ILogout {
    type: ActionTypes.logout;
}

export const register = (
    registerFormValues: ReduxFormValues
): AppThunk => async dispatch => {
    try {
        const {
            data: { token },
        } = await api.post<IAuthSuccess>('/users', registerFormValues);
        dispatch<IRegisterSuccess>({
            type: ActionTypes.registerSuccess,
            token,
        });
        sendToast({
            title: 'Sign up success',
            content: 'We successfully created your account !',
            type: 'success',
        });
        return Promise.resolve();
    } catch ({
        response: {
            data: { message },
        },
    }) {
        sendToast({
            title: 'Sign up error',
            content: message,
            type: 'error',
        });
        return Promise.reject(message);
    }
};

export const login = (
    loginFormValues: ReduxFormValues
): AppThunk => async dispatch => {
    try {
        const {
            data: { token },
        } = await api.post<IAuthSuccess>('/users/token', loginFormValues);
        dispatch<ILoginSuccess>({
            type: ActionTypes.loginSuccess,
            token,
        });
        return Promise.resolve();
    } catch ({
        response: {
            data: { message },
        },
    }) {
        sendToast({
            title: 'Sign in error ',
            content: message,
            type: 'error',
        });
        return Promise.reject(message);
    }
};

export const logout = (): ILogout => {
    // tslint:disable-next-line: no-floating-promises
    persistor.purge();
    return {
        type: ActionTypes.logout,
    };
};
