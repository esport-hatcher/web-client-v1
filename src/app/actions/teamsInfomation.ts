import { Dispatch } from 'redux';
import api from '@/api';
import { ActionTypes, IGetState } from './types';

export interface ITeams {
    id: number;
    avatarTeamUrl: string;
    bannerUrl: string;
    game: string;
    name: string;
    region: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ITeamsFetchsAction {
    type: ActionTypes.fetchteamSucess;
    payload: ITeams[];
}

export interface ITeamsFailure {
    message: string;
}

export interface ITeamsErrorAction {
    type: ActionTypes.fetchTeamError;
    payload: ITeamsFailure;
}

export interface ITeamsSuccess {
    teams: ITeams[];
}

export const fetchTeams = () => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        if (token && myId) {
            const { data } = await api.get<ITeams[]>(`users/${myId.id}/teams`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch<ITeamsFetchsAction>({
                type: ActionTypes.fetchteamSucess,
                payload: data,
            });
        }
    } catch ({ response: { data } }) {
        dispatch<ITeamsErrorAction>({
            type: ActionTypes.fetchTeamError,
            payload: data,
        });
    }
};
