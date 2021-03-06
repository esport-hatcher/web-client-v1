import { combineReducers, Action } from 'redux';
import { ActionTypes } from 'app/actions';
import authenticationReducer from './authentication';
import adminPanelReducer from './adminPanel';
import fetchTeamsReducer from './teams';
import taskReducer from './tasks';
import formReducer from './forms';
import calendarReducer from './calendar';

export const appReducer = combineReducers({
    authentication: authenticationReducer,
    adminPanel: adminPanelReducer,
    teams: fetchTeamsReducer,
    tasks: taskReducer,
    forms: formReducer,
    calendar: calendarReducer,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action) => {
    if (action.type === ActionTypes.logout) {
        // tslint:disable-next-line: no-parameter-reassignment
        state = undefined;
    }

    return appReducer(state, action);
};

export * from './tasks';
export * from './teams';
export * from './calendar';
