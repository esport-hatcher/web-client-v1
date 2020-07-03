import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, IGetState } from './types';
import { sendToast } from 'app/shared';
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

export interface ICreateTeamActionSucess {
    type: ActionTypes.createTeamSucess;
    payload: ITeams[];
}

export interface ICreateTeamActionError {
    type: ActionTypes.createTeamError;
    payload: ITeamsFailure;
}

export interface IInvitePlayerActionSucess {
    type: ActionTypes.invitePlayerSucess;
    payload: IUser[];
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
            const { data } = await api.get<IUser[]>(`teams/${teamId}/users`);
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
            const { data } = await api.post<ITeams[]>(`teams/`, {
                game: valueGame,
                name: valueName,
                region: valueRegion,
            });
            dispatch<ICreateTeamActionSucess>({
                type: ActionTypes.createTeamSucess,
                payload: data,
            });
            sendToast({
                title: 'Team Created',
                content: 'You successfully created a team !',
                type: 'success',
            });
        }
    } catch (err) {
        sendToast({
            title: 'Team Error',
            content: err,
            type: 'error',
        });
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
                `teams/${teamId}/users/${playerId}`
            );
            dispatch<IInvitePlayerActionSucess>({
                type: ActionTypes.invitePlayerSucess,
                payload: data,
            });
            sendToast({
                title: 'player invited',
                content: 'You successfully add a player !',
                type: 'success',
            });
        }
    } catch (err) {
        sendToast({
            title: 'invitation fail',
            content: err,
            type: 'error',
        });
        //console.log('nope', err);
    }
};
