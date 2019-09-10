import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Router, Link } from 'react-router-dom';
import { NavBar } from './Navigation';
import history from '@/services/history';

let wrapped: ReactWrapper;

describe('<Navigation />', () => {
    beforeEach(() => {
        wrapped = mount(
            <Router history={history}>
                <NavBar />
            </Router>
        );
    });

    it('render 4 items', () => {
        expect(wrapped.find(Link).length).toBe(4);
    });

    it('render an admin pannel item', () => {
        expect(
            wrapped
                .find(Link)
                .first()
                .text()
        ).toBe('Admin Pannel');
    });

    it('render a feed item', () => {
        expect(
            wrapped
                .find(Link)
                .last()
                .text()
        ).toBe('Feed');
    });

    it('render a chat item', () => {
        expect(
            wrapped
                .find(Link)
                .at(1)
                .text()
        ).toBe('Chat');
    });

    it('render a settings item', () => {
        expect(
            wrapped
                .find(Link)
                .at(2)
                .text()
        ).toBe('Settings');
    });
});
