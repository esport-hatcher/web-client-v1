import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, CountQuery } from './types';
import { IUser } from './user';

export interface IAdminPanelFetchUsersSuccessAction {
    type: ActionTypes.adminPanelFetchUsersSuccess;
    payload: { users: IUser[]; pages: number };
}

export interface IAdminPanelFetchNextPageSuccessAction {
    type: ActionTypes.adminPanelFetchNextPageSuccess;
    payload: IUser[];
}

export interface IAdminPanelSetLoadingAction {
    type: ActionTypes.adminPanelSetLoading;
}

export interface IAdminPanelCountFiltersAction {
    type: ActionTypes.adminPanelCountFilters;
    payload: IAdminPanelFiltersCount;
}

export interface IAdminPanelFiltersCount {
    all: number;
    players: number;
    admins: number;
}

export const adminPanelFetchUsers = (filters?: string) => async (
    dispatch: Dispatch
) => {
    const {
        data: { records },
    } = await api.get<{ records: number }>(`/users?${filters}&count=true`);
    const { data } = await api.get<IUser[]>(`/users?${filters}`);
    dispatch<IAdminPanelFetchUsersSuccessAction>({
        type: ActionTypes.adminPanelFetchUsersSuccess,
        payload: { users: data, pages: Math.floor(records / 50) + 1 },
    });
};

export const adminPanelFetchNextPage = (filters?: string) => async (
    dispatch: Dispatch
) => {
    const { data } = await api.get<IUser[]>(`/users?${filters}`);

    dispatch<IAdminPanelFetchNextPageSuccessAction>({
        type: ActionTypes.adminPanelFetchNextPageSuccess,
        payload: data,
    });
};

export const adminPanelCountFilters = () => async (dispatch: Dispatch) => {
    const all = await api.get<CountQuery>('/users?count=true');
    const admins = await api.get<CountQuery>('/users?count=true&superAdmin=1');
    const players = await api.get<CountQuery>('/users?count=true&superAdmin=0');
    dispatch<IAdminPanelCountFiltersAction>({
        type: ActionTypes.adminPanelCountFilters,
        payload: {
            all: all.data.records,
            admins: admins.data.records,
            players: players.data.records,
        },
    });
};
