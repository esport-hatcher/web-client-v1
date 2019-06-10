import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers';

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

// tslint:disable-next-line: no-any
const initialState: any = {
    auth: { token: localStorage.getItem('ehToken') },
};

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
