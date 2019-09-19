import React, { useCallback } from 'react';
import { pick } from 'lodash';
import { useDispatch } from 'react-redux';
import { SmartInput, RoundButton } from '@/components';
import { isNotEmpty } from '@/shared/utils';
import {
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
    IRegisterForm,
    register,
} from '@/actions';
import { checkIfError, displayErrorMsg } from './RegisterBaseForm';
import { isStageMore } from '@/screens/Auth/AuthPage';
import { RegisterOnChangeValue, RegisterOnChangeStatus } from '@/custom-hooks';

interface IProps {
    errorMsg?: string;
    onChangeValue: RegisterOnChangeValue;
    onChangeStatus: RegisterOnChangeStatus;
    fields: IRegisterProps;
    stage: RegisterFormStages;
    setStage: typeof registerFormSetStage;
}

export const RegisterFormMore: React.FC<IProps> = ({
    errorMsg,
    fields,
    onChangeStatus,
    onChangeValue,
    stage,
}) => {
    const dispatch = useDispatch();

    const _onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const fieldsValue: IRegisterForm = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
        };

        e.preventDefault();

        for (const key in fields) {
            if (key !== 'passwordConfirm') {
                fieldsValue[key as keyof IRegisterForm] =
                    fields[key as keyof IRegisterProps].value;
            }
        }

        if (checkIfError(pick(fields, 'firstName', 'lastName'))) {
            dispatch(register(fieldsValue));
        }
    };

    const _isNotEmpty = useCallback(isNotEmpty, []);

    return (
        <section
            className={`auth-form__container auth-form__container__more ${
                isStageMore(stage) ? 'auth-form__container__more--active' : ''
            }`}
        >
            <div className='auth-form__container__title title title--big'>
                Tell us more about yourself
            </div>
            <form className='auth-form__basic' onSubmit={_onSubmit}>
                <SmartInput
                    value={fields.firstName.value}
                    type='text'
                    placeholder='First name'
                    name='firstName'
                    icon='pen'
                    register={true}
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[_isNotEmpty]}
                />
                <SmartInput
                    value={fields.lastName.value}
                    type='text'
                    icon='pen'
                    placeholder='Last name'
                    name='lastName'
                    register={true}
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[_isNotEmpty]}
                />
                {displayErrorMsg(errorMsg)}
                <RoundButton onClick={() => null} />
            </form>
        </section>
    );
};
