import { Action, IUser, ActionTypes } from 'app/actions';
import { combineReducers } from 'redux';

const user = (state: IUser | null = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchUserSession:
            return action.user;
        case ActionTypes.logout:
            return null;
        default:
            return state;
    }
};

const token = (state: string | null = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.loginSuccess:
        case ActionTypes.registerSuccess:
            return action.token;
        case ActionTypes.logout:
            return null;
        default:
            return state;
    }
};

export default combineReducers({ user, token });
