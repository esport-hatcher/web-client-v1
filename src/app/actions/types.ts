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
import {
    IAdminPannelFetchUsersSuccessAction,
    IAdminPannelSetLoadingAction,
} from './adminPannel';

export enum ActionTypes {
    loginSuccess,
    loginError,
    logout,
    registerFormFill,
    registerFormSetStage,
    adminPannelFetchUsersSuccess,
    adminPannelSetLoading,
}

export type Action =
    | ILoginErrorAction
    | ILoginSuccessAction
    | IRegisterFormFillAction
    | IRegisterFormSetStageAction
    | ILogoutAction
    | IAdminPannelFetchUsersSuccessAction
    | IAdminPannelSetLoadingAction;

export type IGetState = () => IStoreState;
