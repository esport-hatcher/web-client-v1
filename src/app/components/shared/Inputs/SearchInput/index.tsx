import React, { useState, useCallback } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useToggler } from 'app/custom-hooks';
import { Spinner } from 'app/components';

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

        const getIcon = () =>
            loading ? (
                <Spinner className='search-input__icon-status' />
            ) : (
                <AiOutlineClose
                    className={`search-input__icon-status icon--button ${
                        focused ? 'icon--pink' : 'icon--light-grey'
                    }`}
                    onClick={emptyInput}
                />
            );

        return (
            <form action='#' className='search-input'>
                <AiOutlineSearch
                    className={`search-input__icon icon--light-grey ${focused &&
                        'search-input__icon--active icon--white'}`}
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
