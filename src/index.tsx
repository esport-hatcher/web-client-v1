import React from 'react';
import ReactDOM from 'react-dom';
import { Root, configureStore } from 'app/config';

export const appStore = configureStore();

ReactDOM.render(<Root store={appStore} />, document.querySelector('#root'));
