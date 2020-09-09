import React, { useCallback } from 'react';
import { useToggler, useInput } from 'app/custom-hooks';
import { BsPencil } from 'react-icons/bs';

interface IProps {
    name: string;
    value: string;
    label: string;
    onChange: (e: React.FocusEvent<HTMLInputElement>) => void;
    className: string;
}

export const ModifiableInput: React.FC<IProps> = ({
    name,
    value,
    label,
    onChange,
    className,
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
                    className={`${className}__input important-info important-info--md`}
                    name={name}
                    value={inputValue}
                    onChange={setInputValue}
                    autoFocus
                    onBlur={onLoseFocus}
                />
            );
        }
        return (
            <p
                className={`${className}__value important-info important-info--md`}
            >
                {displayValue()}
            </p>
        );
    };

    return (
        <div
            className={`${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <label className={`${className}__label label label-sm`}>
                {label}
            </label>
            <button
                className={`${className}__btn ${!displayButton &&
                    `${className}__btn--hidden`}`}
                onClick={setInputMode}
            >
                <BsPencil className={`${className}__btn__icon`} />
            </button>
            {displayContent()}
        </div>
    );
};
