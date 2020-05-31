import { combineReducers, Action } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ActionTypes } from 'app/actions';
import authenticationReducer from './authentication';
import adminPannelReducer from './adminPannel';
import fetchTeamsReducer from './teams';

export const appReducer = combineReducers({
    authentication: authenticationReducer,
    adminPannel: adminPannelReducer,
    teams: fetchTeamsReducer,
    form: formReducer,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState | undefined, action: Action) => {
    if (action.type === ActionTypes.logout) {
        // tslint:disable-next-line: no-parameter-reassignment
        state = undefined;
    }

    return appReducer(state, action);
};
