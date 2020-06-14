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

export const phoneRegExp = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
