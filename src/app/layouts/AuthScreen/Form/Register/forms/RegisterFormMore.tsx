import React, { useCallback, useState } from 'react';
import { pick } from 'lodash';
import { useDispatch } from 'react-redux';
import { SmartInput, IconButton, RoundButton } from '@/components';
import { isNotEmpty } from '@/shared/utils';
import {
    registerFormSetStage,
    IUserProps,
    RegisterFormStages,
    IRegisterForm,
    register,
} from '@/actions';
import { checkIfError, displayErrorMsg } from './RegisterBaseForm';
import { isStageMore } from '@/screens/Auth/AuthPage';
import { RegisterOnChangeValue, RegisterOnChangeStatus } from '@/custom-hooks';
import { FAKE_LOADING_TIME } from '@/config';

interface IProps {
    errorMsg?: string;
    onChangeValue: RegisterOnChangeValue;
    onChangeStatus: RegisterOnChangeStatus;
    fields: IUserProps;
    stage: RegisterFormStages;
    setStage: typeof registerFormSetStage;
}

export const RegisterFormMore: React.FC<IProps> = ({
    errorMsg,
    fields,
    onChangeStatus,
    onChangeValue,
    stage,
    setStage,
}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

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
                    fields[key as keyof IUserProps].value;
            }
        }

        if (checkIfError(pick(fields, 'firstName', 'lastName'))) {
            setLoading(true);
            setTimeout(() => {
                dispatch(register(fieldsValue));
                setLoading(false);
            }, FAKE_LOADING_TIME);
        }
    };

    const _isNotEmpty = useCallback(isNotEmpty, []);

    const onGoBack = useCallback(() => {
        setStage(RegisterFormStages.basic);
    }, [setStage]);

    return (
        <section
            className={`register-screen__container register-screen__container__more ${isStageMore(
                stage
            ) && 'register-screen__container__more--active'}`}
        >
            <div className='register-screen__container__title title title--big'>
                Tell us more about yourself
            </div>

            <form className='register-screen__more' onSubmit={_onSubmit}>
                <RoundButton
                    onClick={onGoBack}
                    icon='chevron_left'
                    className='register-screen__more__btn-back btn btn--round btn--secondary-gradient'
                />
                <SmartInput
                    value={fields.firstName.value}
                    type='text'
                    placeholder='First name'
                    name='firstName'
                    icon='portrait'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[_isNotEmpty]}
                />
                <SmartInput
                    value={fields.lastName.value}
                    type='text'
                    icon='portrait'
                    placeholder='Last name'
                    name='lastName'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    customValidations={[_isNotEmpty]}
                />
                <SmartInput
                    value={fields.city.value}
                    type='text'
                    icon='pin'
                    placeholder='City'
                    name='city'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                />
                <SmartInput
                    value={fields.country.value}
                    type='text'
                    icon='pin'
                    placeholder='Country'
                    name='country'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                />
                <SmartInput
                    value={fields.phoneNumber.value}
                    type='text'
                    icon='phone'
                    placeholder='Phone number'
                    name='phoneNumber'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                />
                {displayErrorMsg(errorMsg)}
                <IconButton
                    className='btn--primary-gradient btn--rounded-bottom register-screen__more__btn'
                    icon='chevron_right'
                    loading={loading}
                >
                    Register
                </IconButton>
            </form>
        </section>
    );
};
