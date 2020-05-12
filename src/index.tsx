import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'app/App';
import { Root } from 'app/config';

// tslint:disable-next-line: no-import-side-effect
import 'app/config/onStart';

ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.querySelector('#root')
);
