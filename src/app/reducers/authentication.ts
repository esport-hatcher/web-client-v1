import { Action, IUser, ActionTypes } from 'app/actions';

const INITIAL_STATE = {
    user: undefined,
    token: undefined,
    errorMsg: {
        login: undefined,
        register: undefined,
    },
};

export interface IAuthentication {
    user?: IUser;
    token?: string;
    errorMsg?: {
        login?: string;
        register?: string;
    };
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
                errorMsg: undefined,
            };
        case ActionTypes.loginError:
            return {
                ...state,
                user: undefined,
                token: undefined,
                errorMsg: { ...state.errorMsg, login: action.payload.message },
            };
        case ActionTypes.registerSuccess:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                errorMsg: undefined,
            };
        case ActionTypes.registerError:
            return {
                ...state,
                user: undefined,
                token: undefined,
                errorMsg: {
                    ...state.errorMsg,
                    register: action.payload.message,
                },
            };
        case ActionTypes.logout:
            return {
                ...state,
                user: undefined,
                token: undefined,
                errorMsg: undefined,
            };
        case ActionTypes.patchUser:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
