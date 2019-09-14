import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { BrowserRouter, Link } from 'react-router-dom';
import { NavBar } from './Navigation';

let wrapped: ReactWrapper;

describe('<Navigation />', () => {
    beforeEach(() => {
        wrapped = mount(
            <BrowserRouter>
                <NavBar admin={false} />
            </BrowserRouter>
        );
    });

    it('render 4 items', () => {
        expect(wrapped.find(Link).length).toBe(4);
    });

    it('render a chat item', () => {
        expect(
            wrapped
                .find(Link)
                .first()
                .text()
        ).toBe('Chat');
    });

    it('render a Logout item', () => {
        expect(
            wrapped
                .find(Link)
                .last()
                .text()
        ).toBe('Logout');
    });

    it('render a Settings item', () => {
        expect(
            wrapped
                .find(Link)
                .at(1)
                .text()
        ).toBe('Settings');
    });

    it('render a Feed item', () => {
        expect(
            wrapped
                .find(Link)
                .at(2)
                .text()
        ).toBe('Feed');
    });
});
