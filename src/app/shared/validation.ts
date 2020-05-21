import api from 'app/api';

export type ReduxFormValidation = undefined | string;

export const isEmail = (value: string): ReduxFormValidation => {
    if (value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
        return undefined;
    }
    return 'Value has to be an email';
};

// Returns a function setting min and max for check function
export const getMinMaxFunction = (min: number, max: number) => {
    return (value: string): ReduxFormValidation => {
        if (value.length < min || value.length > max) {
            return `Value has to be between ${min} and ${max} characters.`;
        }
        return undefined;
    };
};

export const getMinFunction = (min: number) => {
    return (value: string): ReduxFormValidation => {
        if (value.length < min) {
            return `Value has to be at least ${min} characters.`;
        }
        return undefined;
    };
};

export const getMaxFunction = (max: number) => {
    return (value: string): ReduxFormValidation => {
        if (value.length > max) {
            return `Value has to be less than ${max} characters.`;
        }
        return undefined;
    };
};

export const matchesPassword = (
    value: string,
    allValues: { password: string }
): ReduxFormValidation =>
    value === allValues.password
        ? undefined
        : 'Password and confirm password must match';

export const required = (value: string): ReduxFormValidation =>
    value ? undefined : 'Value is required';

// tslint:disable-next-line: no-any
export const isEmailAvailable = async (values: any) => {
    try {
        await api.post('/users/email', {
            email: values.email,
        });
    } catch {
        return Promise.reject({ email: 'Email is already taken' });
    }
};

export const isMin5Max20 = getMinMaxFunction(5, 20);
export const isMin3Max20 = getMinMaxFunction(3, 20);
