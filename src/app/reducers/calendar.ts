import { combineReducers } from 'redux';
import { parseISO, isSameDay } from 'date-fns';
import {
    Action,
    ActionTypes,
    IDetailedEvent,
    IEvent,
    IRawDetailedEvent,
    IRawEvent,
} from 'app/actions';

const normalizeEvent = (rawEvent: IRawEvent): IEvent => {
    return {
        ...rawEvent,
        dateBegin: parseISO(rawEvent.dateBegin),
        dateEnd: parseISO(rawEvent.dateEnd),
    };
};

const normalizeDetailedEvent = (
    rawEvent: IRawDetailedEvent
): IDetailedEvent => {
    return {
        ...rawEvent,
        dateBegin: parseISO(rawEvent.dateBegin),
        dateEnd: parseISO(rawEvent.dateEnd),
    };
};

const events = (state: IEvent[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.calendarFetchEventsSuccess:
            return action.events.map(event => normalizeEvent(event));
        case ActionTypes.calendarCreateEventSuccess:
            return [...state, normalizeEvent(action.event)];
        default:
            return state;
    }
};

const selectedEvent = (
    state: IDetailedEvent | null = null,
    action: Action
): IDetailedEvent | null => {
    switch (action.type) {
        case ActionTypes.calendarFetchEventSuccess:
            return normalizeDetailedEvent(action.event);
        case ActionTypes.calendarAddMemberEventSuccess:
            if (state) {
                return {
                    ...state,
                    Users: [...state.Users, action.user],
                };
            }
            return state;
        case ActionTypes.calendarRemoveMemberEventSuccess:
            if (state) {
                return {
                    ...state,
                    Users: state.Users.filter(
                        user => user.id !== action.userId
                    ),
                };
            }
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

    events.forEach(event => {
        if (
            isSameDay(event.dateBegin, currentDay) ||
            isSameDay(event.dateEnd, currentDay)
        ) {
            dayEvents.push(event);
        }
    });
    return dayEvents;
};

export default combineReducers({ events, selectedEvent });
