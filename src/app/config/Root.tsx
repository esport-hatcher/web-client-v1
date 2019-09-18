import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';
import { Provider } from 'react-redux';

declare global {
    // tslint:disable-next-line: interface-name
    interface Window {
        // tslint:disable-next-line: no-any
        gapi: any;
        // tslint:disable-next-line: no-any
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Root = ({
    children,
    initialState,
}: {
    // tslint:disable-next-line: no-any
    children: any;
    // tslint:disable-next-line: no-any
    initialState: any;
}) => {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
    return <Provider store={store}>{children}</Provider>;
};
