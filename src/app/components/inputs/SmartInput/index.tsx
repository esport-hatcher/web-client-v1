import React, { useState, useEffect, useCallback } from 'react';
import api from '@/api';
import { Icon, IconName } from '@/components';
import { sleep } from '@/shared/utils';

enum InputStatus {
    valid,
    error,
    loading,
    empty,
}

interface IProps {
    placeholder: string;
    name: string;
    type: 'email' | 'text' | 'password';
    pattern?: string;
    required?: boolean;
    icon: IconName;
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    customValidations?: ((value: string) => boolean)[];
    onChangeStatus?: (field: string, value: boolean) => void;
    onFocus?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onLoseFocus?:
        | ((event: React.FocusEvent<HTMLInputElement>) => void)
        | undefined;
}

export const SmartInput: React.FC<IProps> = React.memo(
    ({
        placeholder,
        className,
        name,
        type,
        pattern,
        required,
        icon,
        value,
        customValidations,
        onChange,
        onFocus,
        onLoseFocus,
        onChangeStatus,
    }) => {
        const [inputStatus, setInputStatus] = useState(InputStatus.empty);

        const _onChangeStatus = useCallback(
            (value: boolean) => {
                if (onChangeStatus) {
                    onChangeStatus(name, value);
                }
            },
            [onChangeStatus, name]
        );

        useEffect(() => {
            if (!customValidations || customValidations.length === 0) {
                _onChangeStatus(true);
            }
        }, [customValidations, _onChangeStatus]);

        const checkIfNotTaken = async () => {
            try {
                await sleep(1000);
                await api.post('/users/email', {
                    email: value,
                });
                setInputStatus(InputStatus.valid);
                _onChangeStatus(true);
            } catch {
                setInputStatus(InputStatus.error);
                _onChangeStatus(false);
            }
        };

        const executeValidations = (): boolean => {
            for (const customValidation of customValidations!) {
                if (!customValidation(value)) {
                    return false;
                }
            }
            return true;
        };

        const validationCheck = async () => {
            if (customValidations) {
                if (executeValidations()) {
                    if (type === 'email') {
                        setInputStatus(InputStatus.loading);
                        await checkIfNotTaken();
                    } else {
                        setInputStatus(InputStatus.valid);
                        _onChangeStatus(true);
                    }
                } else {
                    setInputStatus(InputStatus.error);
                    _onChangeStatus(false);
                }
            }
        };

        const getIconStatus = (): IconName => {
            switch (inputStatus) {
                case InputStatus.error:
                    return 'error';
                case InputStatus.valid:
                    return 'check';
                case InputStatus.loading:
                    return 'rotate_right';
                default:
                    return icon;
            }
        };

        const getInputStatus = (): string => {
            switch (inputStatus) {
                case InputStatus.error:
                    return 'error';
                case InputStatus.valid:
                    return 'success';
                case InputStatus.loading:
                    return 'loading';
                default:
                    return '';
            }
        };

        return (
            <div className='smart-input'>
                <input
                    id={name}
                    className={`smart-input__input smart-input__input--${getInputStatus()} ${className}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    pattern={pattern}
                    onBlur={validationCheck}
                    required={required}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlurCapture={onLoseFocus}
                />
                <Icon className='smart-input__icon' name={getIconStatus()} />
                <label htmlFor={name} className='smart-input__label'>
                    {placeholder}
                </label>
            </div>
        );
    }
);
