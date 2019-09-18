import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { App } from '@/App';
import { Root } from '@/config';

let wrapped: ReactWrapper;

const initialState = {
    authentication: {
        token: 'blabla',
    },
};

beforeEach(() => {
    wrapped = mount(
        <Root initialState={initialState}>
            <App />
        </Root>
    );
});

it('renders the App component', () => {
    expect(wrapped.find('.container').length).toEqual(1);
});
