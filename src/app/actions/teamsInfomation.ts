import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, IGetState } from './types';
import { IUser } from './authentication';

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

export interface ITeamsFetchsAction {
    type: ActionTypes.fetchteamSucess;
    payload: ITeams[];
}

export interface ITeamsFetchsUsers {
    type: ActionTypes.fetchUsersSucess;
    payload: IUser[];
}

export interface ITeamsFailure {
    message: string;
}

export interface ITeamsErrorAction {
    type: ActionTypes.fetchTeamError;
    payload: ITeamsFailure;
}

export interface ITeamsErrorUsers {
    type: ActionTypes.fetchTeamUserError;
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
            dispatch<ITeamsFetchsUsers>({
                type: ActionTypes.fetchUsersSucess,
                payload: data,
            });
        }
    } catch (err) {
        dispatch<ITeamsErrorUsers>({
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
            const { data } = await api.post<ICreateTeam[]>(
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
            const { data } = await api.post<ICreateTeam[]>(
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
