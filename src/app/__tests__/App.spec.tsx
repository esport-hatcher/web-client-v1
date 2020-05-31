import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Root, configureStore } from 'app/config';

let wrapped: ReactWrapper;

const store = configureStore();

beforeEach(() => {
    wrapped = mount(<Root store={store} />);
});

it('renders the App component', () => {
    expect(wrapped.find('.container').length).toEqual(1);
});
