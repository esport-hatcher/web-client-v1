import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app/App';
import { Root } from 'app/config';
import { BrowserRouter } from 'react-router-dom';

// tslint:disable-next-line: no-import-side-effect
import 'app/config/onStart';

ReactDOM.render(
    <Root>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Root>,
    document.querySelector('#root')
);
