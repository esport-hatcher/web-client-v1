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

export interface ITeamsSuccessAction {
    type: ActionTypes.teamsSuccess;
    payload: ITeamsSuccess;
}

export interface ITeamsFailure {
    message: string;
}

export interface ITeamsErrorAction {
    type: ActionTypes.teamsError;
    payload: ITeamsFailure;
}

export interface ITeamsSuccess {
    teams: ITeams;
}

export const fetchTeams = () => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        if (token && myId) {
            const { data } = await api.get<ITeams>(`users/${myId.id}/teams`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch<ITeamsSuccessAction>({
                type: ActionTypes.teamsSuccess,
                payload: {
                    teams: data,
                },
            });
        }
    } catch ({ response: { data } }) {
        dispatch<ITeamsErrorAction>({
            type: ActionTypes.teamsError,
            payload: data,
        });
    }
};
