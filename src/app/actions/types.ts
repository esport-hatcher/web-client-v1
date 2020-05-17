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
    ITeamsFetchsAction,
    ITeamsErrorAction,
    ITeamsFetchsUsers,
    ITeamsErrorUsers,
    ICreateTeamAction,
} from './teamsInfomation';

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
    registerFormSetStage,
    adminPannelFetchUsersSuccess,
    adminPannelSetLoading,
    adminPannelCountFilters,
    fetchteamSucess,
    fetchTeamError,
    fetchUsersSucess,
    fetchTeamUserError,
    createTeam,
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
    | ITeamsFetchsUsers
    | ITeamsErrorAction
    | ITeamsErrorUsers
    | ICreateTeamAction;

export type IGetState = () => IStoreState;
