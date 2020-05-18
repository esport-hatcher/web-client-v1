import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootReducer } from 'app/reducers';

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

const oldAuthentication = JSON.parse(localStorage.getItem('ehToken')!);
// tslint:disable-next-line: no-any
const initialState: any = {
    authentication: oldAuthentication
        ? oldAuthentication
        : { user: null, token: null },
};

export const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export const Root = ({
    children,
}: {
    // tslint:disable-next-line: no-any
    children: any;
    // tslint:disable-next-line: no-any
}) => {
    return (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );
};
