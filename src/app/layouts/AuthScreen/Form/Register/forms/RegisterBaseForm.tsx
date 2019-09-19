import React from 'react';

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
