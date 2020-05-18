import {
    ILoginErrorAction,
    ILoginSuccessAction,
    ILogoutAction,
    IPatchUserAction,
    IDeleteUserAction,
} from './authentication';
import { IRegisterFormFillAction } from './registerForm';
import { IStoreState } from 'app/reducers';
import {
    IAdminPannelFetchUsersSuccessAction,
    IAdminPannelSetLoadingAction,
    IAdminPannelCountFiltersAction,
    IAdminPannelFetchNextPageSuccessAction,
} from './adminPannel';

import { ITeamsFetchsAction, ITeamsErrorAction } from './teamsInfomation';

export type CountQuery = { records: number };

// tslint:disable-next-line: no-any
export type IFieldData = { [key: string]: any };

export enum ActionTypes {
    loginSuccess,
    loginError,
    logout,
    patchUser,
    deleteUser,
    registerFormFill,
    adminPannelFetchNextPageSuccess,
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
    | ILogoutAction
    | IAdminPannelFetchUsersSuccessAction
    | IAdminPannelFetchNextPageSuccessAction
    | IAdminPannelSetLoadingAction
    | IAdminPannelCountFiltersAction
    | IPatchUserAction
    | IDeleteUserAction
    | ITeamsFetchsAction
    | ITeamsErrorAction;

export type IGetState = () => IStoreState;
