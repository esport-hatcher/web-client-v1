import { ThunkAction } from 'redux-thunk';
import { Action as ReduxAction } from 'redux';
import { RootState } from 'app/reducers';
import { ILoginSuccess, IRegisterSuccess, ILogout } from './authentication';
import {
    IAdminPanelFetchUsersSuccessAction,
    IAdminPanelSetLoadingAction,
    IAdminPanelCountFiltersAction,
    IAdminPanelFetchNextPageSuccessAction,
} from './adminPanel';
import { IDeleteUser, IFetchUserSession, IPatchUserSession } from './user';
import { IFetchTeamErrorAction, IFetchTeamSuccessAction } from './teams';
import { IUpdateForm, IResetForm } from './form';

export type CountQuery = { records: number };

// tslint:disable-next-line: no-any
export type IFieldData = { [key: string]: any };

export enum ActionTypes {
    loginSuccess,
    registerSuccess,
    logout,
    fetchUserSession,
    patchUserSession,
    deleteUser,
    adminPanelFetchUsersSuccess,
    adminPanelFetchNextPageSuccess,
    adminPanelSetLoading,
    adminPanelCountFilters,
    fetchTeamSuccess,
    fetchTeamError,
    updateForm,
    resetForm,
}

export type Action =
    | ILoginSuccess
    | IRegisterSuccess
    | ILogout
    | IFetchUserSession
    | IPatchUserSession
    | IDeleteUser
    | IAdminPanelFetchUsersSuccessAction
    | IAdminPanelFetchNextPageSuccessAction
    | IAdminPanelSetLoadingAction
    | IAdminPanelCountFiltersAction
    | IFetchTeamSuccessAction
    | IFetchTeamErrorAction
    | IUpdateForm
    | IResetForm;

export type IGetState = () => RootState;

export type AsyncDispatch = (action: Function) => Promise<void>;

export type AppThunk = ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    ReduxAction<ActionTypes>
>;
