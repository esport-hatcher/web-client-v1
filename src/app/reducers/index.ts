import { combineReducers } from 'redux';
import { authenticationReducer, IAuthentication } from './authentication';
import { registerFormReducer } from './registerForm';
import { IRegisterProps } from '@/actions';

export interface IStoreState {
    authentication: IAuthentication;
    registerForm: IRegisterProps;
}

export default combineReducers<IStoreState>({
    authentication: authenticationReducer,
    registerForm: registerFormReducer,
});
