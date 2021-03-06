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
    IJoinActionSucess,
} from './teams';
import {
    ICreateTaskSuccess,
    IFetchTaskSuccess,
    IDeleteTaskSuccess,
    IPatchTaskSuccess,
} from './tasks';
import { IUpdateForm, IResetForm } from './form';
import {
    ICalendarAddMemberEventSuccess,
    ICalendarCreateEventSuccess,
    ICalendarDeleteEventSuccess,
    ICalendarFetchEventsSuccess,
    ICalendarFetchEventSuccess,
    ICalendarRemoveMemberEventSuccess,
} from './calendar';

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
    calendarDeleteEventSuccess,
    calendarFetchEventsSuccess,
    calendarFetchEventSuccess,
    calendarAddMemberEventSuccess,
    calendarRemoveMemberEventSuccess,
    updateForm,
    resetForm,
    createTeamSucess,
    joinTeamSucess,
    createTeamError,
    fetchTeamSuccess,
    fetchTeamError,
    fetchTeamUserSucess,
    fetchTeamUserError,
    invitePlayerSucess,
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
    | ICalendarDeleteEventSuccess
    | ICalendarFetchEventsSuccess
    | ICalendarFetchEventSuccess
    | ICalendarAddMemberEventSuccess
    | ICalendarRemoveMemberEventSuccess
    | IUpdateForm
    | IResetForm
    | IJoinActionSucess
    | IFetchTeamUserSucess
    | IFetchTeamUserError
    | ICreateTeamActionError
    | ICreateTeamActionSucess
    | IInvitePlayerActionSucess;

export type IGetState = () => RootState;

export type AsyncDispatch = (action: Function) => Promise<void>;

export type AppThunk = ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    ReduxAction<ActionTypes>
>;
