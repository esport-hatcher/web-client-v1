import {
    ILoginErrorAction,
    ILoginSuccessAction,
    ILogoutAction,
    IPatchUserAction,
    IDeleteUserAction,
    IRegisterSuccessAction,
    IRegisterErrorAction,
} from './authentication';
import {
    IAdminPannelFetchUsersSuccessAction,
    IAdminPannelSetLoadingAction,
    IAdminPannelCountFiltersAction,
    IAdminPannelFetchNextPageSuccessAction,
} from './adminPannel';
import { ThunkAction } from 'redux-thunk';
import { Action as ReduxAction } from 'redux';

import { ITeamsFetchsAction, ITeamsErrorAction } from './teamsInfomation';
import { RootState } from 'app/reducers';
import { store } from 'app/config';

export type CountQuery = { records: number };

// tslint:disable-next-line: no-any
export type IFieldData = { [key: string]: any };

export enum ActionTypes {
    loginSuccess,
    loginError,
    registerSuccess,
    registerError,
    logout,
    patchUser,
    deleteUser,
    adminPannelFetchUsersSuccess,
    adminPannelFetchNextPageSuccess,
    adminPannelSetLoading,
    adminPannelCountFilters,
    fetchteamSucess,
    fetchTeamError,
}

export type Action =
    | ILoginSuccessAction
    | ILoginErrorAction
    | IRegisterSuccessAction
    | IRegisterErrorAction
    | ILogoutAction
    | IPatchUserAction
    | IDeleteUserAction
    | IAdminPannelFetchUsersSuccessAction
    | IAdminPannelFetchNextPageSuccessAction
    | IAdminPannelSetLoadingAction
    | IAdminPannelCountFiltersAction
    | ITeamsFetchsAction
    | ITeamsErrorAction;

export type IGetState = () => RootState;

export type AppDispatch = typeof store.dispatch;
export type AsyncDispatch = (action: Function) => Promise<void>;

export type AppThunk = ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    ReduxAction<ActionTypes>
>;
