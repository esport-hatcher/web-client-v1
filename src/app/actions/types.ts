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
import {
    IFetchTeamErrorAction,
    IFetchTeamSuccessAction,
    IFetchTeamUserSucess,
    IFetchTeamUserError,
    ICreateTeamActionError,
    ICreateTeamActionSucess,
    IInvitePlayerActionSucess,
} from './teams';
import {
    ICreateTaskSuccess,
    IFetchTaskSuccess,
    IDeleteTaskSuccess,
    IPatchTaskSuccess,
} from './tasks';
import { IUpdateForm, IResetForm } from './form';
import {
    ICalendarCreateEventSuccess,
    ICalendarFetchEventSuccess,
} from './calendar';
import {
    IFetchContactSuccessAction,
    IFetchContactErrorAction,
} from './contact';

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
    createTaskSuccess,
    fetchTaskSuccess,
    deleteTaskSuccess,
    patchTaskSuccess,
    calendarCreateEventSuccess,
    calendarFetchEventSuccess,
    updateForm,
    resetForm,
    createTeamSucess,
    createTeamError,
    fetchTeamSuccess,
    fetchTeamError,
    fetchTeamUserSucess,
    fetchTeamUserError,
    invitePlayerSucess,
    fetchContactSuccess,
    fetchContactError,
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
    | ICreateTaskSuccess
    | IFetchTaskSuccess
    | IDeleteTaskSuccess
    | IPatchTaskSuccess
    | ICalendarCreateEventSuccess
    | ICalendarFetchEventSuccess
    | IUpdateForm
    | IResetForm
    | IFetchTeamUserSucess
    | IFetchTeamUserError
    | ICreateTeamActionError
    | ICreateTeamActionSucess
    | IInvitePlayerActionSucess
    | IFetchContactSuccessAction
    | IFetchContactErrorAction;

export type IGetState = () => RootState;

export type AsyncDispatch = (action: Function) => Promise<void>;

export type AppThunk = ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    ReduxAction<ActionTypes>
>;
