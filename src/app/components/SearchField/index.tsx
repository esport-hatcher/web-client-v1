import React, { Component } from 'react';
import { Icon } from '@/components';

export class SearchField extends Component {
    state = { focused: false };

    setFocused = () => this.setState({ focused: !this.state.focused });

    render() {
        const { focused } = this.state;

        return (
            <form action='#' className='search-input'>
                <Icon
                    className={`search-input__icon ${
                        focused ? 'search-input__icon--active' : ''
                    }`}
                    name='search'
                />
                <input
                    className='search-input__input'
                    type='text'
                    name='search-input'
                    placeholder='Search...'
                    onFocus={this.setFocused}
                    onBlur={this.setFocused}
                />
            </form>
        );
    }
}
