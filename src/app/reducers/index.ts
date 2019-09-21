import { combineReducers } from 'redux';
import { authenticationReducer, IAuthentication } from './authentication';
import { registerFormReducer, IRegisterFormReducer } from './registerForm';
import { ActionTypes } from '@/actions';

export interface IStoreState {
    authentication: IAuthentication;
    registerForm: IRegisterFormReducer;
}

export const appReducer = combineReducers<IStoreState>({
    authentication: authenticationReducer,
    registerForm: registerFormReducer,
});

// tslint:disable-next-line: no-any
export const rootReducer = (state: any, action: any) => {
    if (action.type === ActionTypes.logout) {
        // tslint:disable-next-line: no-parameter-reassignment
        state = undefined;
    }

    return appReducer(state, action);
};
