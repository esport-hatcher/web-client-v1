import React, { useCallback } from 'react';
import { pick } from 'lodash';
import { SmartInput, RoundButton } from '@/components';
import { isNotEmpty } from '@/shared/utils';
import {
    registerFormFill,
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
    IRegisterForm,
} from '@/actions';
import {
    checkIfError,
    onChangeInput,
    onChangeStatus,
    displayErrorMsg,
} from './RegisterBaseForm';
import { isStageMore } from '@/screens/Auth/AuthPage';

interface IProps {
    onSubmit: Function;
    errorMsg?: string;
    onChangeFields: typeof registerFormFill;
    fields: IRegisterProps;
    stage: RegisterFormStages;
    setStage: typeof registerFormSetStage;
}

export const RegisterFormMore: React.FC<IProps> = ({
    onSubmit,
    errorMsg,
    fields,
    onChangeFields,
    stage,
}) => {
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
            onSubmit(fieldsValue);
        }
    };

    /**
     * Memoizing all functions with useCallback to avoid to render each SmartInput on rerender
     */
    const _onChangeInput = useCallback(onChangeInput(onChangeFields), [
        onChangeFields,
    ]);
    const _onChangeStatus = useCallback(onChangeStatus(onChangeFields), [
        onChangeFields,
    ]);

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
                    onChange={_onChangeInput}
                    onChangeStatus={_onChangeStatus}
                    customValidation={_isNotEmpty}
                />
                <SmartInput
                    value={fields.lastName.value}
                    type='text'
                    icon='pen'
                    placeholder='Last name'
                    name='lastName'
                    register={true}
                    onChange={_onChangeInput}
                    onChangeStatus={_onChangeStatus}
                    customValidation={_isNotEmpty}
                />
                {displayErrorMsg(errorMsg)}
                <RoundButton onClick={() => null} />
            </form>
        </section>
    );
};
