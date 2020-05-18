import { Action, ActionTypes, IUserProps } from 'app/actions';

export interface IRegisterFormReducer {
    fields: IUserProps;
}

const INITIAL_STATE = {
    fields: {
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
        city: {
            value: '',
            valid: false,
        },
        country: {
            value: '',
            valid: false,
        },
        phoneNumber: {
            value: '',
            valid: false,
        },
    },
};

export const registerFormReducer = (
    state: IRegisterFormReducer = INITIAL_STATE,
    action: Action
): IRegisterFormReducer => {
    switch (action.type) {
        case ActionTypes.registerFormFill:
            return {
                ...state,
                fields: { ...state.fields, ...action.payload },
            };
        default:
            return state;
    }
};
