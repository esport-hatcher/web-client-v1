import React, { Component } from 'react';
import { SmartInput, RoundButton } from '@/components';
import { registerFormFill, IRegisterProps } from '@/actions';
import {
    isEmail,
    getMinMaxFunction,
    getCompareStringFunction,
} from '@/shared/utils';

interface IBaseFormProps {
    onChangeFields: typeof registerFormFill;
    fieldsValue: IRegisterProps;
    errorMsg?: string;
}

export abstract class RegisterFormBasic<
    T extends IBaseFormProps
> extends Component<T> {
    checkIfError = () => {
        const {
            email,
            username,
            password,
            passwordConfirm,
        } = this.props.fieldsValue;
        if (
            !email.valid ||
            !username.valid ||
            !password.valid ||
            !passwordConfirm.valid
        ) {
            return false;
        }
        return true;
    };

    onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChangeFields, fieldsValue } = this.props;

        // console.log(event.target.name);
        onChangeFields({
            ...fieldsValue,
            [event.target.name]: {
                ...fieldsValue[event.target.name as keyof IRegisterProps],
                value: event.target.value,
            },
        });
    };

    onChangeStatus = (field: string, valid: boolean) => {
        const { fieldsValue, onChangeFields } = this.props;

        onChangeFields({
            ...fieldsValue,
            [field]: {
                ...fieldsValue[field as keyof IRegisterProps],
                valid,
            },
        });
    };

    displayErrorMsg = () => {
        const { errorMsg } = this.props;

        if (errorMsg) {
            return (
                <p className='body-text body-text--medium body-text--error auth-form__form__error-msg'>
                    {errorMsg}
                </p>
            );
        }
        return null;
    };
}
