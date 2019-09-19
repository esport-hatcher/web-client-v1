import React, { useState } from 'react';
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
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    register?: boolean;
    customValidations?: ((value: string) => boolean)[];
    onChangeStatus?: (field: string, value: boolean) => void;
}

export const SmartInput: React.FC<IProps> = React.memo(
    ({
        placeholder,
        name,
        type,
        pattern,
        required,
        icon,
        register,
        value,
        customValidations,
        onChange,
        onChangeStatus,
    }) => {
        const [inputStatus, setInputStatus] = useState(InputStatus.empty);

        const _onChangeStatus = (value: boolean) => {
            if (onChangeStatus) {
                onChangeStatus(name, value);
            }
        };

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
                    if (register && type === 'email') {
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
                    return 'sync';
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
                    className={`smart-input__input smart-input__input--${getInputStatus()}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    pattern={pattern}
                    onBlur={validationCheck}
                    required={required}
                    value={value}
                    onChange={onChange}
                />
                <Icon className='smart-input__icon' name={getIconStatus()} />
            </div>
        );
    }
);
