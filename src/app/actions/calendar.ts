import api from 'app/api';
import { sendToast } from 'app/shared';
import { IFormValues } from './form';
import { ActionTypes, AppThunk } from './types';

export interface ICalendarEventCreationSuccess {
    type: ActionTypes.calendarEventCreationSuccess;
}

interface IEvent {
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
        dispatch<ICalendarEventCreationSuccess>({
            type: ActionTypes.calendarEventCreationSuccess,
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
