import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, IGetState } from './types';
import { IUser } from './user';

export interface ITeams {
    TeamUser: [];
    id: number;
    avatarTeamUrl: string;
    bannerUrl: string;
    game: string;
    name: string;
    region: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateTeam {
    game: string;
    name: string;
    region: string;
}

export interface IFetchTeamSuccessAction {
    type: ActionTypes.fetchTeamSuccess;
    payload: ITeams[];
}
export interface IFetchTeamErrorAction {
    type: ActionTypes.fetchTeamError;
    payload: ITeamsFailure;
}

export interface IFetchTeamUserSucess {
    type: ActionTypes.fetchTeamUserSucess;
    payload: IUser[];
}

export interface IFetchTeamUserError {
    type: ActionTypes.fetchTeamUserError;
    payload: ITeamsFailure;
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

export interface ICreateTeamAction {
    type: ActionTypes.createTeam;
    payload: ITeams[];
}

export const fetchTeams = () => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const myId = getState().authentication.user;
        if (myId) {
            const { data } = await api.get<ITeams[]>(`users/${myId.id}/teams`);
            dispatch<IFetchTeamSuccessAction>({
                type: ActionTypes.fetchTeamSuccess,
                payload: data,
            });
        }
    } catch ({ response: { data } }) {
        dispatch<IFetchTeamErrorAction>({
            type: ActionTypes.fetchTeamError,
            payload: data,
        });
    }
};
export const fetchTeamUser = (teamId: number) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        if (token && myId) {
            const { data } = await api.get<IUser[]>(`teams/${teamId}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch<IFetchTeamUserSucess>({
                type: ActionTypes.fetchTeamUserSucess,
                payload: data,
            });
        }
    } catch (err) {
        dispatch<IFetchTeamUserError>({
            type: ActionTypes.fetchTeamUserError,
            payload: err,
        });
    }
};

export const createTeam = (
    valueName: string,
    valueRegion: string,
    valueGame: string
) => async (dispatch: Dispatch, getState: IGetState) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        if (token && myId) {
            const { data } = await api.post(
                `teams/`,
                { game: valueGame, name: valueName, region: valueRegion },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({
                type: ActionTypes.createTeam,
                payload: data,
            });
        }
    } catch (err) {
        //console.log('nope', err);
    }
};

export const invitePlayer = (
    playerId: NumberConstructor,
    teamId: string
) => async (dispatch: Dispatch, getState: IGetState) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        if (token && myId) {
            const { data } = await api.post(
                `teams/${teamId}/users/${playerId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({
                type: ActionTypes.createTeam,
                payload: data,
            });
        }
    } catch (err) {
        //console.log('nope', err);
    }
};
