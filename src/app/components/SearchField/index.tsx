import React, { Component } from 'react';
// tslint:disable-next-line: match-default-export-name
import sprites from '../../../assets/sprite.svg';

export class SearchField extends Component {
    state = { focused: false };

    setFocused = () => this.setState({ focused: !this.state.focused });

    render() {
        const { focused } = this.state;

        return (
            <form action='#' className='search-input'>
                <svg
                    className={`search-input__icon ${
                        focused ? 'search-input__icon--active' : ''
                    }`}
                >
                    <use xlinkHref={`${sprites}#icon-search`} />
                </svg>
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
