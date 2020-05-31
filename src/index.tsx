import React from 'react';
import ReactDOM from 'react-dom';
import { Root, configureStore } from 'app/config';

export const { store, persistor } = configureStore();

ReactDOM.render(
    <Root store={store} persistor={persistor} />,
    document.querySelector('#root')
);
