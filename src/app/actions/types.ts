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
    IAdminPannelCountFiltersAction,
} from './adminPannel';

export type CountQuery = { records: number };

export enum ActionTypes {
    loginSuccess,
    loginError,
    logout,
    registerFormFill,
    registerFormSetStage,
    adminPannelFetchUsersSuccess,
    adminPannelSetLoading,
    adminPannelCountFilters,
}

export type Action =
    | ILoginErrorAction
    | ILoginSuccessAction
    | IRegisterFormFillAction
    | IRegisterFormSetStageAction
    | ILogoutAction
    | IAdminPannelFetchUsersSuccessAction
    | IAdminPannelSetLoadingAction
    | IAdminPannelCountFiltersAction;

export type IGetState = () => IStoreState;
