import { Action, ActionTypes, IEvent } from 'app/actions';
import { combineReducers } from 'redux';

const events = (state: IEvent[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.calendarFetchEventSuccess:
            return action.events;
        default:
            return state;
    }
};

export default combineReducers({ events });
