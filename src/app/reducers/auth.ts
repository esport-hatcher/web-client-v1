import { AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT } from '@/actions/types';
import { IAction } from 'src/typings/states/global';

export default (state = {}, action: IAction) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                token: action.payload,
                errorMsg: undefined,
            };
        case AUTH_ERROR:
            return {
                ...state,
                errorMsg: action.payload,
                user: undefined,
                token: undefined,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: undefined,
                user: undefined,
                errorMsg: undefined,
            };
        default:
            return state;
    }
};
