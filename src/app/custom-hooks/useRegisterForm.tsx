import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
    registerFormFill,
    IRegisterProps,
    registerFormSetStage,
    RegisterFormStages,
} from '@/actions';

export type RegisterOnChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>
) => void;

export type RegisterOnChangeStatus = (field: string, valid: boolean) => void;

export const useRegisterForm = (): {
    onChangeStatus: RegisterOnChangeStatus;
    onChangeValue: RegisterOnChangeValue;
    setStage: typeof registerFormSetStage;
} => {
    const dispatch = useDispatch();

    const onChangeValue = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                registerFormFill(state => {
                    return {
                        ...state,
                        [event.target.name]: {
                            ...state[event.target.name as keyof IRegisterProps],
                            value: event.target.value,
                        },
                    };
                })
            );
        },
        [dispatch]
    );

    const onChangeStatus = useCallback(
        (field: string, valid: boolean) => {
            dispatch(
                registerFormFill(state => {
                    return {
                        ...state,
                        [field]: {
                            ...state[field as keyof IRegisterProps],
                            valid,
                        },
                    };
                })
            );
        },
        [dispatch]
    );

    const setStage = useCallback(
        (stage: RegisterFormStages) => dispatch(registerFormSetStage(stage)),
        [dispatch]
    );

    return {
        onChangeStatus,
        onChangeValue,
        setStage,
    };
};
