import api from '@/api';
import { IAction } from 'src/typings/states/global';
import { AUTH_LOGIN, AUTH_ERROR } from './types';

export const checkEmail = (email: string) => async (
    dispatch: (source: IAction) => void
) => {
    // tslint:disable-next-line: no-console
    console.log('WIP');
};
