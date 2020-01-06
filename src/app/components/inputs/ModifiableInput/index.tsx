import React from 'react';
import { Icon } from '@/components/Icon';
import { useToggler, useInput } from '@/custom-hooks';

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
    const [inputMode, onChangeInputMode] = useToggler(false);
    const [displayButton, onChangeDisplayButton] = useToggler(false);
    const [inputValue, onInputValueChange] = useInput(value);

    const displayValue = () => {
        if (value === inputValue) {
            return value;
        }
        return inputValue;
    };

    const onLoseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onChange(e);
        onChangeInputMode();
    };

    const displayContent = () => {
        if (inputMode) {
            return (
                <input
                    className='modifiable-input__input important-info important-info--md'
                    name={name}
                    value={inputValue}
                    onChange={onInputValueChange}
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
            onMouseEnter={onChangeDisplayButton}
            onMouseLeave={onChangeDisplayButton}
        >
            <label className='modifiable-input__label label label-sm'>
                {label}
            </label>
            <button
                className={`modifiable-input__btn ${!displayButton &&
                    'modifiable-input__btn--hidden'}`}
                onClick={onChangeInputMode}
            >
                <Icon name='pen' className='modifiable-input__btn__icon' />
            </button>
            {displayContent()}
        </div>
    );
};
