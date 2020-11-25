import { Dispatch } from 'redux';
import api from 'app/api';
import { ActionTypes, IGetState } from './types';
import { sendToast } from 'app/shared';
import { IUser } from './user';

export interface IContact {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateContact {
    name: string;
    phoneNumber: string;
    email: string;
}

export interface IFetchContactSuccessAction {
    type: ActionTypes.fetchContactSuccess;
    payload: IContact[];
}

export interface IFetchContactErrorAction {
    type: ActionTypes.fetchContactError;
}

export const createContact = (
    valueName: string,
    valuePhone: string,
    valueEmail: string
) => async (dispatch: Dispatch, getState: IGetState) => {
    try {
        const token = getState().authentication.token;
        const myId = getState().authentication.user;
        const { data } = await api.post<ICreateContact[]>(`contact/`, {
            name: valueName,
            phoneNumber: valuePhone,
            email: valueEmail,
        });
        sendToast({
            title: 'Contact Created',
            content: 'You successfully created a contact !',
            type: 'success',
        });
    } catch (err) {
        sendToast({
            title: 'Contact Error',
            content: err,
            type: 'error',
        });
    }
};

export const fetchContact = () => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const { data } = await api.get(`contact/`);
        return data;
    } catch (err) {
        sendToast({
            title: 'Contact Error',
            content: err,
            type: 'error',
        });
    }
};
