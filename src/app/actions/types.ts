import {
    ILoginErrorAction,
    ILoginSuccessAction,
    ILogoutAction,
    IPatchUserAction,
    IDeleteUserAction,
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

import {
    ITeamsSuccessAction,
    ITeamsFailure,
    ITeamsErrorAction,
    ITeamsSuccess,
} from './teamsInfomation';

export type CountQuery = { records: number };

export type IFieldData = { [key: string]: string };

export enum ActionTypes {
    loginSuccess,
    loginError,
    logout,
    patchUser,
    deleteUser,
    registerFormFill,
    registerFormSetStage,
    adminPannelFetchUsersSuccess,
    adminPannelSetLoading,
    adminPannelCountFilters,
    teamsSuccess,
    teamsError,
}

export type Action =
    | ILoginErrorAction
    | ILoginSuccessAction
    | IRegisterFormFillAction
    | IRegisterFormSetStageAction
    | ILogoutAction
    | IAdminPannelFetchUsersSuccessAction
    | IAdminPannelSetLoadingAction
    | IAdminPannelCountFiltersAction
    | IPatchUserAction
    | IDeleteUserAction;

export type IGetState = () => IStoreState;
