import { ActionTypes } from './types';
import { store } from 'app/config';

type FormInput = {
    valid: boolean;
    value: string;
};

export interface IUserProps {
    username: FormInput;
    password: FormInput;
    passwordConfirm: FormInput;
    email: FormInput;
    firstName: FormInput;
    lastName: FormInput;
    city: FormInput;
    country: FormInput;
    phoneNumber: FormInput;
}

export interface IRegisterFormFillAction {
    type: ActionTypes.registerFormFill;
    payload: IUserProps;
}

export const registerFormFill = (cb: (data: IUserProps) => IUserProps) => {
    return {
        type: ActionTypes.registerFormFill,
        payload: cb(store.getState().registerForm.fields),
    };
};
