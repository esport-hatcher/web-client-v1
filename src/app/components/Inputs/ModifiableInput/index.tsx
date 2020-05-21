import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToggler, useInput } from 'app/custom-hooks';

interface IProps {
    name: string;
    value: string;
    label: string;
    onChange: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const ModifiableInput: React.FC<IProps> = ({
    name,
    value,
    label,
    onChange,
}) => {
    const [inputMode, setInputMode] = useToggler(false);
    const [displayButton, , setDisplayButton] = useToggler(false);
    const [inputValue, setInputValue] = useInput(value);

    const displayValue = () => {
        if (value === inputValue) {
            return value;
        }
        return inputValue;
    };

    const onLoseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onChange(e);
        setInputMode();
    };

    const onMouseLeave = useCallback(() => {
        setDisplayButton(false);
    }, [setDisplayButton]);

    const onMouseEnter = useCallback(() => {
        setDisplayButton(true);
    }, [setDisplayButton]);

    const displayContent = () => {
        if (inputMode) {
            return (
                <input
                    className='modifiable-input__input important-info important-info--md'
                    name={name}
                    value={inputValue}
                    onChange={setInputValue}
                    autoFocus
                    onBlur={onLoseFocus}
                />
            );
        }
        return (
            <p className='modifiable-input__value important-info important-info--md'>
                {displayValue()}
            </p>
        );
    };

    return (
        <div
            className='modifiable-input'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <label className='modifiable-input__label label label-sm'>
                {label}
            </label>
            <button
                className={`modifiable-input__btn ${!displayButton &&
                    'modifiable-input__btn--hidden'}`}
                onClick={setInputMode}
            >
                <FontAwesomeIcon
                    icon='pen'
                    className='modifiable-input__btn__icon'
                />
            </button>
            {displayContent()}
        </div>
    );
};
