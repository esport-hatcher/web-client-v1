import { combineReducers } from 'redux';
import { Action, ActionTypes, IEvent, IRawEvent } from 'app/actions';
import { parseISO, isSameDay } from 'date-fns';

const normalizeEvents = (rawEvents: IRawEvent[]): IEvent[] => {
    return rawEvents.map(rawEvent => ({
        ...rawEvent,
        dateBegin: parseISO(rawEvent.dateBegin),
        dateEnd: parseISO(rawEvent.dateEnd),
    }));
};
const events = (state: IEvent[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.calendarFetchEventSuccess:
            return normalizeEvents(action.events);
        case ActionTypes.calendarCreateEventSuccess:
            return [...state, ...normalizeEvents([action.event])];
        default:
            return state;
    }
};

/** SELECTORS */

export const getEventsByDay = (
    events: IEvent[],
    currentDay: Date
): IEvent[] => {
    const dayEvents: IEvent[] = [];

    events.map(event => {
        if (
            isSameDay(event.dateBegin, currentDay) ||
            isSameDay(event.dateEnd, currentDay)
        ) {
            dayEvents.push(event);
        }
    });
    return dayEvents;
};

export default combineReducers({ events });
