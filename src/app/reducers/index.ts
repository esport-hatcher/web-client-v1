import { combineReducers } from 'redux';
import { authenticationReducer, IAuthentication } from './authentication';
import { registerFormReducer, IRegisterFormReducer } from './registerForm';

export interface IStoreState {
    authentication: IAuthentication;
    registerForm: IRegisterFormReducer;
}

export default combineReducers<IStoreState>({
    authentication: authenticationReducer,
    registerForm: registerFormReducer,
});
