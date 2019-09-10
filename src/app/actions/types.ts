import { ILoginErrorAction, ILoginSuccessAction } from './authentication';
import { IStoreState } from '@/reducers';

export enum ActionTypes {
    loginSuccess,
    loginError,
}

export type Action = ILoginErrorAction | ILoginSuccessAction;

export type IGetState = () => IStoreState;
