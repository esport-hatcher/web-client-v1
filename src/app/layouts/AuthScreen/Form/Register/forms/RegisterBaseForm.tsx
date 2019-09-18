import React from 'react';
import {
    registerFormFill,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';

interface IFieldsProps {
    [key: string]: {
        value: string;
        valid: boolean;
    };
}

export const checkIfError = <T extends IFieldsProps>(fields: T): boolean => {
    for (const key in fields) {
        if (!fields[key].valid) {
            return false;
        }
    }
    return true;
};

export const displayErrorMsg = (
    errorMsg: string | undefined
): JSX.Element | null => {
    if (errorMsg) {
        return (
            <p className='body-text body-text--medium body-text--error auth-form__form__error-msg'>
                {errorMsg}
            </p>
        );
    }
    return null;
};

export const onChangeInput = (onChangeFields: typeof registerFormFill) => (
    event: React.ChangeEvent<HTMLInputElement>
) => {
    onChangeFields(state => {
        return {
            ...state,
            [event.target.name]: {
                ...state[event.target.name as keyof IRegisterProps],
                value: event.target.value,
            },
        };
    });
};

export const onChangeStatus = (onChangeFields: typeof registerFormFill) => (
    field: string,
    valid: boolean
) => {
    onChangeFields(state => {
        return {
            ...state,
            [field]: {
                ...state[field as keyof IRegisterProps],
                valid,
            },
        };
    });
};

export const isStageMore = (stage: RegisterFormStages) =>
    stage === RegisterFormStages.more;
