import { Dispatch } from 'redux';
import { ActionTypes, IGetState, CountQuery } from './types';
import { IUser } from './authentication';
import api from 'app/api';
import { IAdminPannelFiltersCount } from 'app/reducers/adminPannel';

export interface IAdminPannelFetchUsersSuccessAction {
    type: ActionTypes.adminPannelFetchUsersSuccess;
    payload: { users: IUser[]; pages: number };
}

export interface IAdminPannelFetchNextPageSuccessAction {
    type: ActionTypes.adminPannelFetchNextPageSuccess;
    payload: IUser[];
}

export interface IAdminPannelSetLoadingAction {
    type: ActionTypes.adminPannelSetLoading;
}

export interface IAdminPannelCountFiltersAction {
    type: ActionTypes.adminPannelCountFilters;
    payload: IAdminPannelFiltersCount;
}

export const adminPannelFetchUsers = (filters?: string) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    const {
        data: { records },
    } = await api.get<{ records: number }>(`/users?${filters}&count=true`, {
        headers: {
            Authorization: `Bearer ${getState().authentication.token}`,
        },
    });
    const { data } = await api.get<IUser[]>(`/users?${filters}`, {
        headers: {
            Authorization: `Bearer ${getState().authentication.token}`,
        },
    });

    dispatch<IAdminPannelFetchUsersSuccessAction>({
        type: ActionTypes.adminPannelFetchUsersSuccess,
        payload: { users: data, pages: Math.floor(records / 50) + 1 },
    });
};

export const adminPannelFetchNextPage = (filters?: string) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    const { data } = await api.get<IUser[]>(`/users?${filters}`, {
        headers: {
            Authorization: `Bearer ${getState().authentication.token}`,
        },
    });

    dispatch<IAdminPannelFetchNextPageSuccessAction>({
        type: ActionTypes.adminPannelFetchNextPageSuccess,
        payload: data,
    });
};

export const adminpannelCountFilters = () => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    const all = await api.get<CountQuery>('/users?count=true', {
        headers: {
            Authorization: `Bearer ${getState().authentication.token}`,
        },
    });
    const admins = await api.get<CountQuery>('/users?count=true&superAdmin=1', {
        headers: {
            Authorization: `Bearer ${getState().authentication.token}`,
        },
    });
    const players = await api.get<CountQuery>(
        '/users?count=true&superAdmin=0',
        {
            headers: {
                Authorization: `Bearer ${getState().authentication.token}`,
            },
        }
    );
    dispatch<IAdminPannelCountFiltersAction>({
        type: ActionTypes.adminPannelCountFilters,
        payload: {
            all: all.data.records,
            admins: admins.data.records,
            players: players.data.records,
        },
    });
};
