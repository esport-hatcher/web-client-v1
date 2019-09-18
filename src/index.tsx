import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@/App';
import { Root } from '@/config';

const oldAuthentication = JSON.parse(localStorage.getItem('ehToken')!);
// tslint:disable-next-line: no-any
const initialState: any = {
    authentication: oldAuthentication
        ? oldAuthentication
        : { user: null, token: null },
};

ReactDOM.render(
    <Root initialState={initialState}>
        <App />
    </Root>,
    document.querySelector('#root')
);
