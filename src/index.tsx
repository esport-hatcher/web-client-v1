import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@/App';
import { Root } from '@/config';

ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.querySelector('#root')
);
