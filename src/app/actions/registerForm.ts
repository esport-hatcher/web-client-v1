import { ActionTypes, IGetState } from './types';
import { Dispatch } from 'redux';

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
) => (dispatch: Dispatch, getState: IGetState) => {
    return dispatch({
        type: ActionTypes.registerFormFill,
        payload: cb(getState().registerForm.fields),
    });
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
