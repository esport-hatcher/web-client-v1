import { combineReducers } from 'redux';
import { ActionTypes } from '@/actions';
import { authenticationReducer, IAuthentication } from './authentication';
import { registerFormReducer, IRegisterFormReducer } from './registerForm';
import { adminPannelReducer, IAdminPannelReducer } from './adminPannel';
export interface IStoreState {
    authentication: IAuthentication;
    registerForm: IRegisterFormReducer;
    adminPannel: IAdminPannelReducer;
}

export const appReducer = combineReducers<IStoreState>({
    authentication: authenticationReducer,
    registerForm: registerFormReducer,
    adminPannel: adminPannelReducer,
});

// tslint:disable-next-line: no-any
export const rootReducer = (state: any, action: any) => {
    if (action.type === ActionTypes.logout) {
        // tslint:disable-next-line: no-parameter-reassignment
        state = undefined;
    }

    return appReducer(state, action);
};
