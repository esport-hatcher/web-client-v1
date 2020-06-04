import React from 'react';
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

interface IProps {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    noValidation?: boolean;
    className?: string;
    touched?: boolean;
    error?: FieldError;
    Icon?: IconType;
}

const _FormInput = React.forwardRef<HTMLInputElement, IProps>(
    (
        {
            placeholder,
            name,
            type,
            className,
            noValidation = false,
            error = undefined,
            touched = false,
            Icon = AiOutlineRight,
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

        const InputIcon = getIconStatus();

        return (
            <div className='smart-input'>
                <input
                    id={inputId}
                    className={`smart-input__input smart-input__input--${getInputStatus()} ${className}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    ref={ref}
                />
                <InputIcon
                    className='smart-input__icon'
                    data-tip
                    data-for={`error-${inputId}`}
                />
                <label htmlFor={name + inputId} className='smart-input__label'>
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
