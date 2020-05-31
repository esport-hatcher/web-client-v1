import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from 'app/reducers';
import { deserializeState } from 'app/shared';

// tslint:disable: no-console interface-name no-any

declare global {
    interface Window {
        gapi: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

export const configureStore = () => {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const persistedState = deserializeState();

    const store = createStore(
        rootReducer,
        persistedState,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
