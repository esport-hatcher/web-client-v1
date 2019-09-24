import { ActionTypes, IGetState } from './types';
import { IUser } from './authentication';
import { Dispatch } from 'redux';
import api from '@/api';

export const testAction = () => {
    return 'blabl';
};

export interface IAdminPannelFetchUsersSuccessAction {
    type: ActionTypes.adminPannelFetchUsersSuccess;
    payload: IUser[];
}

export interface IAdminPannelSetLoadingAction {
    type: ActionTypes.adminPannelSetLoading;
}

export const adminPannelFetchUsers = (filters?: string) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    const { data } = await api.get<IUser[]>(`/users?${filters}`, {
        headers: {
            Authorization: `Bearer ${getState().authentication.token}`,
        },
    });
    dispatch<IAdminPannelFetchUsersSuccessAction>({
        type: ActionTypes.adminPannelFetchUsersSuccess,
        payload: data,
    });
};
