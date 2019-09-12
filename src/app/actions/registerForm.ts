import { ActionTypes } from './types';

type FormInput = {
    valid: boolean;
    value: string;
};

export interface IRegisterProps {
    username: FormInput;
    password: FormInput;
    passwordConfirm: FormInput;
    email: FormInput;
    firstName: FormInput;
    lastName: FormInput;
}

export interface IRegisterFormFillAction {
    type: ActionTypes.registerFormFill;
    payload: IRegisterProps;
}

export const registerFormFill = (
    data: IRegisterProps
): IRegisterFormFillAction => {
    return {
        type: ActionTypes.registerFormFill,
        payload: data,
    };
};
