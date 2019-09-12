import {
    Action,
    ActionTypes,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';

export interface IRegisterFormReducer {
    stage: RegisterFormStages;
    fields: IRegisterProps;
}

const INITIAL_STATE = {
    stage: RegisterFormStages.basic,
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
        case ActionTypes.registerFormSetStage:
            return {
                ...state,
                stage: action.payload,
            };
        default:
            return state;
    }
};
