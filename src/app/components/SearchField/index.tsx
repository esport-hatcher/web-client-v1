import React, { useState } from 'react';
import { Icon } from '@/components';

export const SearchField: React.FC = () => {
    const [focused, setFocused] = useState(false);

    const toggleFocus = () => setFocused(!focused);

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
                onFocus={toggleFocus}
                onBlur={toggleFocus}
            />
        </form>
    );
};
