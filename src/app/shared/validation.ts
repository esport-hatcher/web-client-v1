import api from 'app/api';
import { ValidationError } from 'yup';

export type ReduxFormValidation = undefined | string;

// tslint:disable-next-line: no-any
export const isEmailAvailable = async (
    email: string
): Promise<boolean | ValidationError> => {
    try {
        await api.post('/users/email', {
            email,
        });
        return Promise.resolve(true);
    } catch {
        return Promise.resolve(false);
    }
};

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
