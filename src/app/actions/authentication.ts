import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, IGetState, IFieldData, AppThunk } from './types';
import { uploadFile, S3_LINK, serializeState } from 'app/shared';
import { ReduxFormValues } from 'app/layouts';

export interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
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

interface IAuthSuccess {
    token: string;
    user: IUser;
}

interface IAuthFailure {
    message: string;
}

/** LOGIN ACTIONS */
export interface ILoginSuccessAction {
    type: ActionTypes.loginSuccess;
    payload: IAuthSuccess;
}

export interface ILoginErrorAction {
    type: ActionTypes.loginError;
    payload: IAuthFailure;
}

/** REGISTER ACTIONS */
export interface IRegisterSuccessAction {
    type: ActionTypes.registerSuccess;
    payload: IAuthSuccess;
}

export interface IRegisterErrorAction {
    type: ActionTypes.registerError;
    payload: IAuthFailure;
}

/** LOGOUT ACTIONS */
export interface ILogoutAction {
    type: ActionTypes.logout;
}

/** USER ACTIONS */
export interface IPatchUserAction {
    type: ActionTypes.patchUser;
    payload: IUser;
}

export interface IDeleteUserAction {
    type: ActionTypes.deleteUser;
    payload: IUser;
}

export const register = (
    registerFormValues: ReduxFormValues
): AppThunk => async dispatch => {
    try {
        const { data } = await api.post<IAuthSuccess>(
            '/users',
            registerFormValues
        );
        localStorage.setItem('ehToken', JSON.stringify(data));
        dispatch<IRegisterSuccessAction>({
            type: ActionTypes.registerSuccess,
            payload: data,
        });
    } catch ({ response: { data } }) {
        dispatch<ILoginErrorAction>({
            type: ActionTypes.loginError,
            payload: data,
        });
    }
};

export const login = (loginFormValues: ReduxFormValues): AppThunk => async (
    dispatch: Dispatch
) => {
    try {
        const { data } = await api.post<IAuthSuccess>(
            '/users/token',
            loginFormValues
        );
        localStorage.setItem('ehToken', JSON.stringify(data));
        dispatch<ILoginSuccessAction>({
            type: ActionTypes.loginSuccess,
            payload: data,
        });
        return Promise.resolve();
    } catch ({ response: { data } }) {
        dispatch<ILoginErrorAction>({
            type: ActionTypes.loginError,
            payload: data,
        });
        return Promise.reject(data);
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

export const patchUser = (patchData: IFieldData) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;
        const id = getState().authentication.user!.id;

        if (token && id) {
            if (patchData.avatarUrl) {
                await uploadFile({
                    file: patchData.avatarUrl,
                    name: 'profile-image',
                    token,
                });
            }
            const { data } = await api.patch<IUser>(
                `/users/${id}`,
                patchData.avatarUrl
                    ? {
                          ...patchData,
                          avatarUrl: `${S3_LINK}/${id}/profile-image.${
                              patchData.avatarUrl.type.match(/image\/(.+)/)[1]
                          }`,
                      }
                    : patchData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            serializeState(getState());
            dispatch<IPatchUserAction>({
                type: ActionTypes.patchUser,
                payload: data,
            });
        }
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.log(err);
    }
};

export const deleteUser = (user: IUser) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;

        if (token) {
            await api.delete<IUser>(`/users/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch<IDeleteUserAction>({
                type: ActionTypes.deleteUser,
                payload: user,
            });
        }
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.log(err);
    }
};

export const logout = (): ILogoutAction => {
    localStorage.removeItem('ehToken');
    return {
        type: ActionTypes.logout,
    };
};
