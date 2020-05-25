import React, { useCallback } from 'react';
import { pick } from 'lodash';
import { SmartInput, RoundButton } from 'app/components';
import { IUserProps } from 'app/actions';
import {
    getMinMaxFunction,
    getCompareStringFunction,
    isEmail,
} from 'app/shared/utils';
import { checkIfError, displayErrorMsg } from './RegisterBaseForm';
import {
    RegisterOnChangeValue,
    RegisterOnChangeStatus,
} from 'app/custom-hooks/useRegisterForm';
import { RegisterStage } from '../RegisterForm';

interface IProps {
    onChangeValue: RegisterOnChangeValue;
    onChangeStatus: RegisterOnChangeStatus;
    fields: IUserProps;
    goTo: Function;
    errorMsg?: string;
}

export const RegisterFormBasic: React.FC<IProps> = ({
    errorMsg,
    fields,
    goTo,
    onChangeStatus,
    onChangeValue,
}) => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            checkIfError(
                pick(fields, 'email', 'username', 'password', 'passwordConfirm')
            )
        ) {
            goTo(RegisterStage.more);
        }
    };

    const {
        password: { value },
    } = fields;

    /**
     * Memoizing all functions with useCallback to avoid to render each SmartInput on rerender
     */
    const _isEmail = useCallback(isEmail, []);
    const minMaxPwd = useCallback(getMinMaxFunction(5, 20), []);
    const minMaxUserName = useCallback(getMinMaxFunction(3, 20), []);
    const compareString = useCallback(getCompareStringFunction(value), [value]);

    return (
        <div className='register-screen__container'>
            <div className='register-screen__container__title title title--big'>
                Register to <br />
                Esport-Hatcher
            </div>
            <form className='register-screen__basic' onSubmit={onSubmit}>
                <SmartInput
                    icon='envelope'
                    value={fields.email.value}
                    type='email'
                    placeholder='Email'
                    name='email'
                    required={true}
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[_isEmail]}
                />
                <SmartInput
                    icon='pen'
                    required={true}
                    value={fields.username.value}
                    type='text'
                    placeholder='Username'
                    name='username'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[minMaxUserName]}
                />
                <SmartInput
                    icon='lock'
                    required={true}
                    value={fields.password.value}
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[minMaxPwd]}
                />
                <SmartInput
                    required={true}
                    icon='lock'
                    value={fields.passwordConfirm.value}
                    name='passwordConfirm'
                    type='password'
                    placeholder='Confirm Password'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[minMaxPwd, compareString]}
                />
                {displayErrorMsg(errorMsg)}
                <RoundButton
                    icon='chevron-right'
                    className='register-screen__basic__btn btn btn--round btn--secondary-gradient'
                />
            </form>
        </div>
    );
};
