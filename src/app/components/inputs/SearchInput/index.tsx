import React, { useState, useCallback } from 'react';
import { Icon } from 'app/components';
import { useToggler } from 'app/custom-hooks';

interface IProps {
    onSearch: (value: string) => void;
    initialValue?: string;
    loading?: boolean;
}

export const SearchInput: React.FC<IProps> = React.memo(
    ({ onSearch, initialValue, loading }) => {
        const [focused, setFocused] = useToggler(false);
        const [value, setValue] = useState(initialValue || '');

        const setChange = useCallback(
            (value: string) => {
                setValue(value);
                onSearch(value);
            },
            [onSearch]
        );

        const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
            setChange(event.target.value);
        };

        const emptyInput = useCallback(() => {
            setChange('');
        }, [setChange]);

        // TODO: OPTIMIZE
        const getIcon = () => {
            if (loading) {
                return (
                    <Icon
                        className={`search-input__icon-status  icon--rotate ${
                            focused ? 'icon--green' : 'icon--light-grey'
                        }`}
                        name='rotate_right'
                    />
                );
            }
            return (
                <Icon
                    className={`search-input__icon-status icon--button ${
                        focused ? 'icon--pink' : 'icon--light-grey'
                    }`}
                    name='cross'
                    onClick={emptyInput}
                />
            );
        };

        return (
            <form action='#' className='search-input'>
                <Icon
                    className={`search-input__icon ${focused &&
                        'search-input__icon--active'}`}
                    name='search'
                />
                <input
                    className='search-input__input'
                    type='text'
                    name='search-input'
                    placeholder='Search...'
                    value={value}
                    onChange={onChangeEvent}
                    onFocus={setFocused}
                    onBlur={setFocused}
                />
                {value.length > 0 && getIcon()}
            </form>
        );
    }
);
