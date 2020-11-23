import api from 'app/api';
import { sendToast } from 'app/shared';
import { IFormValues } from './form';
import { ActionTypes, AppThunk } from './types';
import { startOfMonth, endOfMonth } from 'date-fns';
import { ITeam } from './teams';
import { IUser } from './user';

/** DATA TYPES */

export interface IUserE extends IUser {
    EventUser: IEventUser;
}

interface IEventUser {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    EventId: number;
    UserId: number;
}

export interface IRawEvent {
    id: number;
    title: string;
    description: string;
    place: string;
    dateBegin: string;
    dateEnd: string;
    TeamId?: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface IEvent extends Omit<IRawEvent, 'dateBegin' | 'dateEnd'> {
    dateBegin: Date;
    dateEnd: Date;
}

export interface IRawDetailedEvent extends IRawEvent {
    Team: ITeam;
    Users: IUserE[];
}

export interface IDetailedEvent
    extends Omit<IRawDetailedEvent, 'dateBegin' | 'dateEnd'> {
    dateBegin: Date;
    dateEnd: Date;
}

/** ACTION TYPES */

export interface ICalendarCreateEventSuccess {
    type: ActionTypes.calendarCreateEventSuccess;
    event: IRawEvent;
}

export interface ICalendarDeleteEventSuccess {
    type: ActionTypes.calendarDeleteEventSuccess;
    eventId: number;
}

export interface ICalendarFetchEventsSuccess {
    type: ActionTypes.calendarFetchEventsSuccess;
    events: IRawEvent[];
}

export interface ICalendarFetchEventSuccess {
    type: ActionTypes.calendarFetchEventSuccess;
    event: IRawDetailedEvent;
}

export interface ICalendarAddMemberEventSuccess {
    type: ActionTypes.calendarAddMemberEventSuccess;
    user: IUserE;
}

export interface ICalendarRemoveMemberEventSuccess {
    type: ActionTypes.calendarRemoveMemberEventSuccess;
    userId: number;
}

export const createEvent = (
    formValues: IFormValues,
    option: number
): AppThunk => async (dispatch, getState) => {
    try {
        const userId = getState().authentication.user!.id;
        const { data } = await api.post<IRawEvent>(
            option === 0
                ? `/users/${userId}/events`
                : `/teams/${option}/events`,
            formValues
        );
        dispatch<ICalendarCreateEventSuccess>({
            type: ActionTypes.calendarCreateEventSuccess,
            event: data,
        });
        sendToast({
            title: 'Event created !',
            type: 'success',
        });
    } catch ({ response: { data } }) {
        // tslint:disable-next-line: no-console
        console.log(data);
    }
};

export const deleteEvent = (
    eventId: number,
    teamId?: number
): AppThunk => async (dispatch, getState) => {
    try {
        if (!teamId) {
            const userId = getState().authentication.user!.id;
            await api.delete(`/users/${userId}/events/${eventId}`);
        } else {
            await api.delete(`/teams/${teamId}/events/${eventId}`);
        }
        dispatch<ICalendarDeleteEventSuccess>({
            type: ActionTypes.calendarDeleteEventSuccess,
            eventId,
        });
        sendToast({
            title: 'Event deleted !',
            type: 'error',
        });
    } catch ({ response: { data } }) {
        // tslint:disable-next-line: no-console
        console.log(data);
    }
};
export const fetchEvents = (currentMonth: Date): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        const userId = getState().authentication.user!.id;

        const { data } = await api.get<IRawEvent[]>(
            `/users/${userId}/events?dateBegin=${startOfMonth(
                currentMonth
            )}&dateEnd=${endOfMonth(currentMonth)}`
        );
        dispatch<ICalendarFetchEventsSuccess>({
            type: ActionTypes.calendarFetchEventsSuccess,
            events: data,
        });
    } catch ({ response: { data } }) {
        // tslint:disable-next-line: no-console
        console.log(data);
    }
};

export const fetchEvent = (eventId: number): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        const userId = getState().authentication.user!.id;

        const { data } = await api.get<IRawDetailedEvent>(
            `/users/${userId}/events/${eventId}`
        );
        dispatch<ICalendarFetchEventSuccess>({
            type: ActionTypes.calendarFetchEventSuccess,
            event: data,
        });
    } catch ({ response: { data } }) {
        // tslint:disable-next-line: no-console
        console.log(data);
    }
};

export const addMemberEvent = (
    teamId: number,
    userId: number,
    eventId: number
): AppThunk => async dispatch => {
    try {
        const { data } = await api.post<IUserE>(
            `/teams/${teamId}/events/${eventId}/users/${userId}`
        );
        dispatch<ICalendarAddMemberEventSuccess>({
            type: ActionTypes.calendarAddMemberEventSuccess,
            user: data,
        });
    } catch ({ response: { data } }) {
        // tslint:disable-next-line: no-console
        console.log(data);
    }
};

export const removeMemberEvent = (
    teamId: number,
    userId: number,
    eventId: number
): AppThunk => async dispatch => {
    try {
        await api.delete(`/teams/${teamId}/events/${eventId}/users/${userId}`);
        dispatch<ICalendarRemoveMemberEventSuccess>({
            type: ActionTypes.calendarRemoveMemberEventSuccess,
            userId,
        });
    } catch ({ response: { data } }) {
        // tslint:disable-next-line: no-console
        console.log(data);
    }
};
