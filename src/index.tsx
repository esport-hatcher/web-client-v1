import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app/App';
import { Root } from 'app/config';

ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.querySelector('#root')
);
