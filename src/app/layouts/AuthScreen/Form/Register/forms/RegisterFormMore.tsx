import React, { useCallback, useState } from 'react';
import { AiOutlineLeft, AiOutlineLogin, AiOutlineUser } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import {
    FormInput,
    IconButton,
    RoundButton,
    NumberInput,
} from 'app/components';
import { IFormValues } from 'app/actions';
import { phoneRegExp } from 'app/shared';
import { RegisterStage } from '../RegisterForm';

interface IProps {
    goTo: Function;
    onSubmit: (formValues: IFormValues) => Promise<void>;
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'Is it your real first name ?'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Is it your real last name ?'),
    city: Yup.string()
        .notRequired()
        .min(2, 'Is it a real city ?'),
    country: Yup.string()
        .notRequired()
        .min(2, 'Is it a real country ?'),
    phoneNumber: Yup.string()
        .notRequired()
        .matches(phoneRegExp, 'Please enter a valid phone number'),
});

export const RegisterFormMore: React.FC<IProps> = React.memo(
    ({ goTo, onSubmit }) => {
        const [loading, setLoading] = useState(false);

        const {
            register,
            handleSubmit,
            errors,
            formState: { dirtyFields },
            control,
        } = useForm({
            mode: 'onChange',
            validationSchema,
        });

        const onGoBack = useCallback(() => {
            goTo(RegisterStage.basic);
        }, [goTo]);

        const _onSubmit = useCallback(
            async (formValues: IFormValues) => {
                try {
                    setLoading(true);
                    await onSubmit(formValues);
                } catch {
                    setLoading(false);
                }
            },
            [setLoading, onSubmit]
        );

        return (
            <div className='register-screen__container'>
                <div className='register-screen__container__title title title--xl'>
                    Tell us more about you
                </div>

                <form
                    className='register-screen__more'
                    onSubmit={handleSubmit(_onSubmit)}
                >
                    <RoundButton
                        type='button'
                        onClick={onGoBack}
                        Icon={AiOutlineLeft}
                        className='register-screen__more__btn-back btn btn--round btn--tertiary--gradient'
                    />
                    <FormInput
                        type='text'
                        placeholder='First name'
                        name='firstName'
                        error={errors['firstName']}
                        touched={dirtyFields.has('firstName')}
                        Icon={AiOutlineUser}
                        autoCapitalize
                        ref={register}
                    />
                    <FormInput
                        type='text'
                        placeholder='Last name'
                        name='lastName'
                        error={errors['lastName']}
                        touched={dirtyFields.has('lastName')}
                        Icon={AiOutlineUser}
                        autoCapitalize
                        ref={register}
                    />
                    <FormInput
                        type='text'
                        placeholder='City'
                        name='city'
                        error={errors['city']}
                        touched={dirtyFields.has('city')}
                        Icon={FiMapPin}
                        autoCapitalize
                        ref={register}
                    />
                    <FormInput
                        type='text'
                        placeholder='Country'
                        name='country'
                        error={errors['country']}
                        touched={dirtyFields.has('country')}
                        Icon={FiMapPin}
                        autoCapitalize
                        ref={register}
                    />
                    <Controller
                        name='phoneNumber'
                        control={control}
                        as={NumberInput}
                        Icon={BsPhone}
                        error={errors['phoneNumber']}
                        touched={dirtyFields.has('phoneNumber')}
                        placeholder='Phone number'
                        format='+33 # ## ## ## ##'
                    />
                    <IconButton
                        className='btn--primary--gradient btn--rounded-bottom register-screen__more__btn'
                        Icon={AiOutlineLogin}
                        loading={loading}
                        type='submit'
                    >
                        Register
                    </IconButton>
                </form>
            </div>
        );
    }
);
