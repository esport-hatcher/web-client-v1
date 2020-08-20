import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, IGetState } from './types';

export interface ITeam {
    id: number;
    avatarTeamUrl: string;
    bannerUrl: string;
    game: string;
    name: string;
    region: string;
    createdAt: string;
    updatedAt: string;
}

export interface IFetchTeamSuccessAction {
    type: ActionTypes.fetchTeamSuccess;
    payload: ITeam[];
}
export interface IFetchTeamErrorAction {
    type: ActionTypes.fetchTeamError;
}

export interface ITeamFailure {
    message: string;
}

export interface ITeamSuccess {
    teams: ITeam[];
}

export const fetchTeams = () => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const myId = getState().authentication.user;
        if (myId) {
            const { data } = await api.get<ITeam[]>(`users/${myId.id}/teams`);
            dispatch<IFetchTeamSuccessAction>({
                type: ActionTypes.fetchTeamSuccess,
                payload: data,
            });
        }
    } catch ({ response: { data } }) {
        dispatch<IFetchTeamErrorAction>({
            type: ActionTypes.fetchTeamError,
        });
    }
};
