import React, { useCallback } from 'react';
import { SmartInput, RoundButton } from '@/components';
import { pick } from 'lodash';

import {
    registerFormFill,
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';
import {
    getMinMaxFunction,
    getCompareStringFunction,
    isEmail,
} from '@/shared/utils';
import {
    checkIfError,
    isStageMore,
    onChangeInput,
    onChangeStatus,
    displayErrorMsg,
} from './RegisterBaseForm';

interface IProps {
    onChangeFields: typeof registerFormFill;
    setStage: typeof registerFormSetStage;
    fields: IRegisterProps;
    stage: RegisterFormStages;
    errorMsg?: string;
}

export const RegisterFormBasic: React.FC<IProps> = ({
    errorMsg,
    fields,
    onChangeFields,
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
     * Memoizing all verifications functions to avoid triggering react.memo
     */
    const _isEmail = useCallback(isEmail, []);
    const minMaxPwd = useCallback(getMinMaxFunction(5, 20), []);
    const minMaxUserName = useCallback(getMinMaxFunction(3, 20), []);
    const compareString = useCallback(getCompareStringFunction(value), [value]);

    const _onChangeInput = useCallback(onChangeInput(onChangeFields), [
        onChangeFields,
    ]);
    const _onChangeStatus = useCallback(onChangeStatus(onChangeFields), [
        onChangeFields,
    ]);

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
                    onChange={_onChangeInput}
                    onChangeStatus={_onChangeStatus}
                    customValidation={_isEmail}
                />
                <SmartInput
                    icon='pen'
                    required={true}
                    value={fields.username.value}
                    type='text'
                    placeholder='Username'
                    name='username'
                    register={true}
                    onChange={_onChangeInput}
                    onChangeStatus={_onChangeStatus}
                    customValidation={minMaxUserName}
                />
                <SmartInput
                    icon='lock'
                    required={true}
                    value={fields.password.value}
                    type='password'
                    placeholder='Password'
                    name='password'
                    register={true}
                    onChange={_onChangeInput}
                    onChangeStatus={_onChangeStatus}
                    customValidation={minMaxPwd}
                />
                <SmartInput
                    required={true}
                    icon='lock'
                    value={fields.passwordConfirm.value}
                    name='passwordConfirm'
                    type='password'
                    register={true}
                    placeholder='Confirm Password'
                    onChange={_onChangeInput}
                    onChangeStatus={_onChangeStatus}
                    customValidation={compareString}
                />
                {displayErrorMsg(errorMsg)}
                <RoundButton onClick={() => null} />
            </form>
        </section>
    );
};
