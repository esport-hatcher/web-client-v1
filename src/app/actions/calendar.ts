import api from 'app/api';
import { sendToast } from 'app/shared';
import { IFormValues } from './form';
import { ActionTypes, AppThunk } from './types';
import { startOfMonth, endOfMonth } from 'date-fns';

export interface IEvent {
    id: number;
    title: string;
    description: string;
    place: string;
    dateBegin: Date;
    dateEnd: Date;
    TeamId?: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface ICalendarCreateEventSuccess {
    type: ActionTypes.calendarCreateEventSuccess;
}

export interface ICalendarFetchEventSuccess {
    type: ActionTypes.calendarFetchEventSuccess;
    events: IEvent[];
}

export const createEvent = (
    formValues: IFormValues,
    option: number
): AppThunk => async (dispatch, getState) => {
    try {
        const userId = getState().authentication.user!.id;
        const { data } = await api.post<IEvent>(
            option === 0
                ? `/users/${userId}/events`
                : `/teams/${option}/events`,
            formValues
        );
        dispatch<ICalendarCreateEventSuccess>({
            type: ActionTypes.calendarCreateEventSuccess,
        });
        sendToast({
            title: 'Event created successfully !',
            content: `Ok`,
            type: 'success',
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

        const { data } = await api.get<IEvent[]>(
            `/users/${userId}/events?dateBegin=${startOfMonth(
                currentMonth
            )}&dateEnd=${endOfMonth(currentMonth)}`
        );
        dispatch<ICalendarFetchEventSuccess>({
            type: ActionTypes.calendarFetchEventSuccess,
            events: data,
        });
    } catch ({ response: { data } }) {
        // tslint:disable-next-line: no-console
        console.log(data);
    }
};
