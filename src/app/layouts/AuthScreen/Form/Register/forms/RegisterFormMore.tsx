import React, { useCallback, useState } from 'react';
import { pick } from 'lodash';
import { useDispatch } from 'react-redux';
import {
    SmartInput,
    IconButton,
    RoundButton,
    AutoComplete,
} from 'app/components';
import { isNotEmpty } from 'app/shared/utils';
import { IUserProps, IRegisterForm, register } from 'app/actions';
import { checkIfError, displayErrorMsg } from './RegisterBaseForm';
import {
    RegisterOnChangeValue,
    RegisterOnChangeStatus,
} from 'app/custom-hooks';
import { FAKE_LOADING_TIME } from 'app/config';
import { RegisterStage } from '../RegisterForm';

interface IProps {
    errorMsg?: string;
    onChangeValue: RegisterOnChangeValue;
    onChangeStatus: RegisterOnChangeStatus;
    fields: IUserProps;
    goTo: Function;
}

export const RegisterFormMore: React.FC<IProps> = ({
    errorMsg,
    fields,
    onChangeStatus,
    onChangeValue,
    goTo,
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
        goTo(RegisterStage.basic);
    }, [goTo]);

    const setCountry = useCallback(
        (country: string) => {
            onChangeValue({ target: { name: 'country', value: country } });
        },
        [onChangeValue]
    );

    return (
        <div className='register-screen__container'>
            <div className='register-screen__container__title title title--big'>
                Tell us more about yourself
            </div>

            <form className='register-screen__more' onSubmit={_onSubmit}>
                <RoundButton
                    onClick={onGoBack}
                    icon='chevron-left'
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
                    icon='map-pin'
                    placeholder='City'
                    name='city'
                    onChange={onChangeValue}
                    onChangeStatus={onChangeStatus}
                />
                <AutoComplete
                    label='Country'
                    items={['Angola', 'Andorre', 'Angleterre', 'Arabie']}
                    onSelect={setCountry}
                    icon='map-pin'
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
                    icon={loading ? 'spinner' : 'sign-in-alt'}
                    rotation={loading ? 90 : undefined}
                    loading={loading}
                >
                    Register
                </IconButton>
            </form>
        </div>
    );
};
