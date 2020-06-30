import React, { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import ReactTooltip from 'react-tooltip';
import { IconType } from 'react-icons/lib';
import {
    AiOutlineCheck,
    AiOutlineExclamationCircle,
    AiOutlineRight,
    AiOutlineLoading,
} from 'react-icons/ai';
import { FieldError } from 'react-hook-form';
import { capitalizeFirstLetter } from 'normalize-text';

interface IFormInputProps
    extends Omit<React.HTMLProps<HTMLInputElement>, 'autoCapitalize'> {
    noValidation?: boolean;
    touched?: boolean;
    error?: FieldError;
    Icon?: IconType;
    inputClassName?: string;
    autoCapitalize?: boolean;
}

const _FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(
    (
        {
            placeholder,
            name,
            className,
            noValidation = false,
            error = undefined,
            touched = false,
            Icon = AiOutlineRight,
            autoCapitalize = false,
            inputClassName,
            ...props
        },
        ref
    ) => {
        const inputId = uuid();
        const isError = error;
        const isLoading = false;
        const isValid = touched && !error;

        const getIconStatus = (): IconType => {
            if (!noValidation) {
                if (isLoading) {
                    return AiOutlineLoading;
                }
                if (isError) {
                    return AiOutlineExclamationCircle;
                }
                if (isValid) {
                    return AiOutlineCheck;
                }
            }
            return Icon;
        };

        const getInputStatus = (): string => {
            if (!noValidation) {
                if (isLoading) {
                    return 'loading';
                }
                if (error) {
                    return 'error';
                }
                if (isValid) {
                    return 'success';
                }
            }
            return '';
        };

        const capitalizeWords = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target && e.target.value) {
                    // TODO: Capitalize first letter of every word
                    e.target.value = capitalizeFirstLetter(e.target.value);
                }
            },
            []
        );

        const InputIcon = getIconStatus();

        return (
            <div className={`${className} form-input`}>
                <input
                    {...props}
                    id={inputId}
                    className={`${inputClassName} form-input__input form-input__input--${getInputStatus()}`}
                    placeholder={placeholder}
                    name={name}
                    ref={ref}
                    onChange={autoCapitalize ? capitalizeWords : undefined}
                />
                <InputIcon
                    className='form-input__icon'
                    data-tip
                    data-for={`error-${inputId}`}
                />
                <label htmlFor={name + inputId} className='form-input__label'>
                    {placeholder}
                </label>
                {error && !noValidation && (
                    <ReactTooltip
                        id={`error-${inputId}`}
                        type='error'
                        backgroundColor='#f6696b;'
                        place='left'
                    >
                        {error.message}
                    </ReactTooltip>
                )}
            </div>
        );
    }
);

export const FormInput = React.memo(_FormInput);
