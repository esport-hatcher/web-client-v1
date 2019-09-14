import {
    ILoginErrorAction,
    ILoginSuccessAction,
    ILogoutAction,
} from './authentication';
import {
    IRegisterFormFillAction,
    IRegisterFormSetStageAction,
} from './registerForm';
import { IStoreState } from '@/reducers';

export enum ActionTypes {
    loginSuccess,
    loginError,
    logout,
    registerFormFill,
    registerFormSetStage,
}

export type Action =
    | ILoginErrorAction
    | ILoginSuccessAction
    | IRegisterFormFillAction
    | IRegisterFormSetStageAction
    | ILogoutAction;

export type IGetState = () => IStoreState;
