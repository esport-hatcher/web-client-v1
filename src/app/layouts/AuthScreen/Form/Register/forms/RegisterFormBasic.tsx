import React, { useCallback } from 'react';
import { pick } from 'lodash';
import { SmartInput, RoundButton } from '@/components';
import {
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';
import {
    getMinMaxFunction,
    getCompareStringFunction,
    isEmail,
} from '@/shared/utils';
import { checkIfError, displayErrorMsg } from './RegisterBaseForm';
import {
    RegisterOnChangeValue,
    RegisterOnChangeStatus,
} from '@/custom-hooks/useRegisterForm';
import { isStageMore } from '@/screens/Auth/AuthPage';

interface IProps {
    setStage: typeof registerFormSetStage;
    onChangeValue: RegisterOnChangeValue;
    onChangeStatus: RegisterOnChangeStatus;
    fields: IRegisterProps;
    stage: RegisterFormStages;
    errorMsg?: string;
}

export const RegisterFormBasic: React.FC<IProps> = ({
    errorMsg,
    fields,
    onChangeStatus,
    onChangeValue,
    setStage,
    stage,
}) => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            checkIfError(
                pick(fields, 'email', 'username', 'password', 'passwordConfirm')
            )
        ) {
            setStage(RegisterFormStages.more);
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
        <section
            className={`auth-form__container auth-form__container__basic ${
                !isStageMore(stage) ? 'auth-form__container__basic--active' : ''
            }`}
        >
            <div className='auth-form__container__title title title--big'>
                Register to <br />
                Esport-Hatcher
            </div>
            <form className='auth-form__basic' onSubmit={onSubmit}>
                <SmartInput
                    icon='mail'
                    value={fields.email.value}
                    type='email'
                    placeholder='Email'
                    name='email'
                    register={true}
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
                    register={true}
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
                    register={true}
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
                    register={true}
                    placeholder='Confirm Password'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[minMaxPwd, compareString]}
                />
                {displayErrorMsg(errorMsg)}
                <RoundButton onClick={() => null} />
            </form>
        </section>
    );
};
