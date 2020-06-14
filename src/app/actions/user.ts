import { persistor } from 'index';
import api from 'app/api';
import { ActionTypes, AppThunk, IFieldData } from './types';
import { uploadFile, S3_LINK, sendToast } from 'app/shared';
import { ILogout } from './authentication';

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
    createdAt: Date;
    updatedAt: Date;
}

export interface IFetchUserSession {
    type: ActionTypes.fetchUserSession;
    user: IUser;
}

/** USER ACTIONS */
export interface IPatchUserSession {
    type: ActionTypes.patchUserSession;
    user: IUser;
}

export interface IDeleteUser {
    type: ActionTypes.deleteUser;
    payload: IUser;
}

export const fetchUserSession = (): AppThunk => async dispatch => {
    try {
        const { data } = await api.get<IUser>('/users/me');
        dispatch<IFetchUserSession>({
            type: ActionTypes.fetchUserSession,
            user: data,
        });
        sendToast({
            title: 'Sign in success',
            content: `Happy to see you back ${data.username}!`,
            type: 'success',
        });
    } catch ({ response: { data } }) {
        await persistor.purge();
        dispatch<ILogout>({
            type: ActionTypes.logout,
        });
    }
};

export const patchUserSession = (patchData: IFieldData): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        const id = getState().authentication.user!.id;

        if (id) {
            if (patchData.avatarUrl) {
                await uploadFile({
                    file: patchData.avatarUrl,
                    name: 'profile-image',
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
                    : patchData
            );
            dispatch<IPatchUserSession>({
                type: ActionTypes.patchUserSession,
                user: data,
            });
        }
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.log(err);
    }
};

export const deleteUser = (user: IUser): AppThunk => async dispatch => {
    try {
        await api.delete<IUser>(`/users/${user.id}`);
        dispatch<IDeleteUser>({
            type: ActionTypes.deleteUser,
            payload: user,
        });
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.log(err);
    }
};
