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

import { ITeamsFetchsAction, ITeamsErrorAction } from './teamsInfomation';

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
    fetchteamSucess,
    fetchTeamError,
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
    | IDeleteUserAction
    | ITeamsFetchsAction
    | ITeamsErrorAction;

export type IGetState = () => IStoreState;
