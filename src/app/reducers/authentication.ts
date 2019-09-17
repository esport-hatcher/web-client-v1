import { Action, IUser, ActionTypes } from '@/actions';

const INITIAL_STATE = {
    user: undefined,
    token: undefined,
    errorMsg: undefined,
};

export interface IAuthentication {
    user?: IUser;
    token?: string;
    errorMsg?: string;
}

export const authenticationReducer = (
    state: IAuthentication = INITIAL_STATE,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.loginSuccess:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case ActionTypes.loginError:
            return {
                ...state,
                user: undefined,
                token: undefined,
                errorMsg: action.payload.message,
            };
        case ActionTypes.logout:
            return {
                ...state,
                user: undefined,
                token: undefined,
                errorMsg: undefined,
            };
        default:
            return state;
    }
};
