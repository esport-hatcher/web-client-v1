import { ILoginErrorAction, ILoginSuccessAction } from './authentication';
import { IRegisterFormFillAction } from './registerForm';
import { IStoreState } from '@/reducers';

export enum ActionTypes {
    loginSuccess,
    loginError,
    registerFormFill,
}

export type Action =
    | ILoginErrorAction
    | ILoginSuccessAction
    | IRegisterFormFillAction;

export type IGetState = () => IStoreState;
