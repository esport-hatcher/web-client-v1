import React, { RefForwardingComponent, MutableRefObject } from 'react';
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
import { Ref } from 'react-hook-form';

interface IProps {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    className?: string;
    error?: string | null;
    Icon?: IconType;
}

export const FormInput = React.forwardRef<HTMLInputElement, IProps>(
    (
        {
            placeholder,
            name,
            type,
            className,
            error = null,
            Icon = AiOutlineRight,
        },
        ref
    ) => {
        const inputId = uuid();

        return (
            <div className='smart-input'>
                <input
                    id={inputId}
                    className={`smart-input__input ${className}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    ref={ref}
                />
                <Icon
                    className='smart-input__icon'
                    data-tip
                    data-for={`error-${inputId}`}
                />
                <label htmlFor={name + inputId} className='smart-input__label'>
                    {placeholder}
                </label>
            </div>
        );
    }
);
