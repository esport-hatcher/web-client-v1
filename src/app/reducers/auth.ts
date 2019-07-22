import {
    LOGIN_ERROR_CREDENTIALS,
    LOGIN_ERROR_MAIL,
    LOGIN_SUCCESS,
    SERVER_ERROR,
} from '@/actions/types';
import { IAction } from 'src/typings/states/global';

interface IAuthReducer {
    token?: string;
    errorMsg?: string;
}

export default (state = {} as IAuthReducer, action: IAction) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                errorMsg: undefined,
            };
        case LOGIN_ERROR_MAIL:
            return {
                ...state,
                errorMsg: 'Unknown user',
                token: undefined,
            };
        case LOGIN_ERROR_CREDENTIALS:
            return {
                ...state,
                token: undefined,
                errorMsg: 'Bad password',
            };
        case SERVER_ERROR:
            return {
                ...state,
                errorMsg: 'Unknown error',
                token: undefined,
            };
        default:
            return state;
    }
};
