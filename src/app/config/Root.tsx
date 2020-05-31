import React from 'react';
import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app';

// tslint:disable: no-any

export const Root = ({ store }: { store: Store<any, AnyAction> }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};
