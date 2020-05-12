import React, { useState, useCallback } from 'react';
import { useToggler } from 'app/custom-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <FontAwesomeIcon
                        className={`search-input__icon-status  icon--rotate ${
                            focused ? 'icon--green' : 'icon--light-grey'
                        }`}
                        icon='spinner'
                        rotation={90}
                    />
                );
            }
            return (
                <FontAwesomeIcon
                    className={`search-input__icon-status icon--button ${
                        focused ? 'icon--pink' : 'icon--light-grey'
                    }`}
                    icon='times'
                    onClick={emptyInput}
                />
            );
        };

        return (
            <form action='#' className='search-input'>
                <FontAwesomeIcon
                    className={`search-input__icon icon--light-grey ${focused &&
                        'search-input__icon--active icon--white'}`}
                    icon='search'
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
