import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from 'app/reducers';

// tslint:disable: no-console interface-name no-any

declare global {
    interface Window {
        gapi: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authentication'],
};

export const configureStore = () => {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // const persistedState = deserializeState();

    const store = createStore(
        persistReducer(persistConfig, rootReducer),
        composeEnhancers(applyMiddleware(thunk))
    );

    const persistor = persistStore(store);

    return { store, persistor };
};
