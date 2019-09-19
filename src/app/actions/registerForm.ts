import { ActionTypes } from './types';
import { store } from '@/config';

type FormInput = {
    valid: boolean;
    value: string;
};

export enum RegisterFormStages {
    basic,
    more,
}

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
    cb: (data: IRegisterProps) => IRegisterProps
) => {
    return {
        type: ActionTypes.registerFormFill,
        payload: cb(store.getState().registerForm.fields),
    };
};

export interface IRegisterFormSetStageAction {
    type: ActionTypes.registerFormSetStage;
    payload: RegisterFormStages;
}

export const registerFormSetStage = (stage: RegisterFormStages) => {
    return {
        type: ActionTypes.registerFormSetStage,
        payload: stage,
    };
};
