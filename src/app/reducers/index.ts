import { combineReducers } from 'redux';
import { authenticationReducer, IAuthentication } from './authentication';

export interface IStoreState {
    authentication: IAuthentication;
}

export default combineReducers<IStoreState>({
    authentication: authenticationReducer,
});
