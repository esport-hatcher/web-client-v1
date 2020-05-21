import React from 'react';
import { v4 as uuid } from 'uuid';
import ReactTooltip from 'react-tooltip';
import { WrappedFieldProps } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IProps {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    pattern?: string;
    className?: string;
    icon: IconProp;
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
        icon,
        noValidation = false,
    }) => {
        const inputId = uuid();

        const getIconStatus = (): IconProp => {
            if (meta.asyncValidating) {
                return 'spinner';
            }
            if (meta.touched && meta.invalid) {
                return 'exclamation-circle';
            }
            if (meta.touched && meta.valid && !noValidation) {
                return 'check';
            }
            return icon;
        };

        const getInputStatus = (): string => {
            if (meta.asyncValidating) {
                return 'loading';
            }
            if (meta.touched && meta.invalid) {
                return 'error';
            }
            if (meta.touched && meta.valid && !noValidation) {
                return 'success';
            }
            return '';
        };

        return (
            <div className='smart-input'>
                <input
                    id={inputId}
                    className={`smart-input__input smart-input__input--${getInputStatus()} ${className}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    pattern={pattern}
                    {...input}
                />
                <FontAwesomeIcon
                    className='smart-input__icon'
                    icon={getIconStatus()}
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
