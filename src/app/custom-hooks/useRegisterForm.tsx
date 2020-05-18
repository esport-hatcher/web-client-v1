import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { registerFormFill, IUserProps } from 'app/actions';

export interface IInputEvent {
    target: {
        name: string;
        value: string;
    };
}

export type RegisterOnChangeValue = (event: IInputEvent) => void;

export type RegisterOnChangeStatus = (field: string, valid: boolean) => void;

export const useRegisterForm = (): {
    onChangeStatus: RegisterOnChangeStatus;
    onChangeValue: RegisterOnChangeValue;
} => {
    const dispatch = useDispatch();

    const onChangeValue = useCallback(
        (event: IInputEvent) => {
            dispatch(
                registerFormFill(state => {
                    return {
                        ...state,
                        [event.target.name]: {
                            ...state[event.target.name as keyof IUserProps],
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
                            ...state[field as keyof IUserProps],
                            valid,
                        },
                    };
                })
            );
        },
        [dispatch]
    );

    return {
        onChangeStatus,
        onChangeValue,
    };
};
