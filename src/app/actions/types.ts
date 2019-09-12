import { ILoginErrorAction, ILoginSuccessAction } from './authentication';
import {
    IRegisterFormFillAction,
    IRegisterFormSetStageAction,
} from './registerForm';
import { IStoreState } from '@/reducers';

export enum ActionTypes {
    loginSuccess,
    loginError,
    registerFormFill,
    registerFormSetStage,
}

export type Action =
    | ILoginErrorAction
    | ILoginSuccessAction
    | IRegisterFormFillAction
    | IRegisterFormSetStageAction;

export type IGetState = () => IStoreState;
