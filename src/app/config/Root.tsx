import React from 'react';
import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist';

// tslint:disable: no-any

interface IProps {
    store: Store<any, AnyAction>;
    persistor: Persistor;
}

export const Root: React.FC<IProps> = ({ store, persistor }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};
