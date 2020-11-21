import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, IGetState } from './types';
import { sendToast } from 'app/shared';
import { IUser } from './user';

export interface ITeamUser {
    id: number;
    playerStatus: boolean;
    teamStatus: boolean;
    role: 'Owner' | 'Admin' | 'Staff' | 'Player';
    color: string;
    createdAt: Date;
    updatedAt: Date;
    UserId: number;
    TeamId: number;
}

export interface ITeam {
    id: number;
    avatarTeamUrl: string;
    bannerUrl: string;
    game: string;
    name: string;
    region: string;
    TeamUser: ITeamUser;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateTeam {
    game: string;
    name: string;
    region: string;
}

export interface IJoinTeam {
    valueNameTeam: string;
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
    teams: ITeam[];
}

export interface ICreateTeamActionSucess {
    type: ActionTypes.createTeamSucess;
    payload: ITeam[];
}

export interface ICreateTeamActionError {
    type: ActionTypes.createTeamError;
    payload: ITeamsFailure;
}

export interface IInvitePlayerActionSucess {
    type: ActionTypes.invitePlayerSucess;
    payload: IUser[];
}

export interface IPatchTeamUser {
    type: ActionTypes.patchTeamUser;
    payload: IUser[];
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

export const pathTeamUser = (teamId: number) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const myId = getState().authentication.user;
        if (myId) {
            const { data } = await api.patch(
                `teams/${teamId}/users/${myId.id}`,
                {
                    playerStatus: true,
                    teamStatus: true,
                }
            );
            dispatch<IPatchTeamUser>({
                type: ActionTypes.patchTeamUser,
                payload: data,
            });
        }
    } catch ({ response: { data } }) {
        dispatch<IFetchTeamErrorAction>({
            type: ActionTypes.fetchTeamError,
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
            const { data } = await api.post<ITeam[]>(`teams/`, {
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

// tslint:disable-next-line: no-any
export const invitePlayer = (playerId: any, teamId: any) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        if (token && myId) {
            const { data } = await api.post<IUser[]>(
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

export const joinTeam = (teamName: string, userId: number) => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        if (token && myId) {
            const { data } = await api.get<ITeam[]>(`/teams/?name=${teamName}`);
            const teamSelected = data.find(element => {
                return element.name === teamName;
            });
            if (teamSelected) {
                if (userId === 0) {
                    await api.post(`users/${myId.id}/teams/${teamSelected.id}`);
                } else {
                    await api.post(`users/${userId}/teams/${teamSelected.id}`);
                }
                dispatch<ICreateTeamActionSucess>({
                    type: ActionTypes.createTeamSucess,
                    payload: [teamSelected],
                });
                sendToast({
                    title: 'player invited',
                    content: 'You successfully add a player !',
                    type: 'success',
                });
            } else {
                sendToast({
                    title: 'unknown Team Name',
                    content: '',
                    type: 'error',
                });
            }
        }
    } catch (err) {
        sendToast({
            title: 'Invitation fail',
            content: '',
            type: 'error',
        });
    }
};
