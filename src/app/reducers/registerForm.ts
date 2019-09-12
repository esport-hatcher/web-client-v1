import { Action, ActionTypes, IRegisterProps } from '@/actions';

const INITIAL_STATE = {
    username: {
        value: '',
        valid: false,
    },
    password: {
        value: '',
        valid: false,
    },
    passwordConfirm: {
        value: '',
        valid: false,
    },
    email: {
        value: '',
        valid: false,
    },
    firstName: {
        value: '',
        valid: false,
    },
    lastName: {
        value: '',
        valid: false,
    },
};

export const registerFormReducer = (
    state: IRegisterProps = INITIAL_STATE,
    action: Action
): IRegisterProps => {
    switch (action.type) {
        case ActionTypes.registerFormFill:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
