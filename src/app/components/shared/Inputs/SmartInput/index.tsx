import React from 'react';
import { v4 as uuid } from 'uuid';
import ReactTooltip from 'react-tooltip';
import { WrappedFieldProps } from 'redux-form';
import { IconType } from 'react-icons/lib';
import {
    AiOutlineCheck,
    AiOutlineExclamationCircle,
    AiOutlineRight,
    AiOutlineLoading,
} from 'react-icons/ai';

interface IProps {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    pattern?: string;
    className?: string;
    Icon?: IconType;
    noValidation?: boolean;
}

export const SmartInput: React.FC<IProps & WrappedFieldProps> = React.memo(
    ({
        placeholder,
        className,
        name,
        type,
        pattern,
        input,
        meta,
        Icon = AiOutlineRight,
        noValidation = false,
    }) => {
        const inputId = uuid();
        const error = meta.touched && meta.invalid;
        const loading = meta.asyncValidating;
        const valid = meta.valid && !noValidation;

        const getIconStatus = (): IconType => {
            if (loading) {
                return AiOutlineLoading;
            }
            if (error) {
                return AiOutlineExclamationCircle;
            }
            if (valid) {
                return AiOutlineCheck;
            }
            return Icon;
        };

        const getInputStatus = (): string => {
            if (loading) {
                return 'loading';
            }
            if (error) {
                return 'error';
            }
            if (valid) {
                return 'success';
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
                    pattern={pattern}
                    // tslint:disable-next-line: no-any
                    {...(input as any)}
                />
                <InputIcon
                    className='smart-input__icon'
                    data-tip
                    data-for={`error-${inputId}`}
                />
                <label htmlFor={name + inputId} className='smart-input__label'>
                    {placeholder}
                </label>
                {meta.touched && meta.invalid && (
                    <ReactTooltip
                        id={`error-${inputId}`}
                        type='error'
                        backgroundColor='#f6696b;'
                        place='left'
                    >
                        {meta.error}
                    </ReactTooltip>
                )}
            </div>
        );
    }
);
