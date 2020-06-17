import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { AiOutlineRight, AiOutlineUser } from 'react-icons/ai';
import { FiMail, FiLock } from 'react-icons/fi';
import { RoundButton, FormInput } from 'app/components';
import { OnSubmitFunction, IFormValues } from 'app/actions';

import { isEmailAvailable } from 'app/shared';

interface IProps {
    onSubmit: OnSubmitFunction;
    defaultValues: IFormValues;
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('E-mail is required')
        .email('E-mail must be valid')
        .test('isEmailAvailable', 'Email is already taken', isEmailAvailable),
    username: Yup.string()
        .required('Username is required')
        .min(2, 'Is it a real username ?'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: Yup.string()
        .required('Password confirm is required')
        .min(8, 'Password must be at least 8 characters long')
        .oneOf(
            [Yup.ref('password')],
            'Password and confirm password must match'
        ),
});

export const RegisterFormBasic: React.FC<IProps> = React.memo(
    ({ onSubmit, defaultValues }) => {
        const {
            register,
            handleSubmit,
            errors,
            formState: { dirtyFields },
        } = useForm({
            mode: 'onChange',
            defaultValues,
            validationSchema,
        });

        return (
            <div className='register-screen__container'>
                <div className='register-screen__container__title title title--xl'>
                    Register to <br />
                    Esport-Hatcher
                </div>
                <form
                    className='register-screen__basic'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormInput
                        type='text'
                        placeholder='Email'
                        name='email'
                        Icon={FiMail}
                        error={errors['email']}
                        touched={dirtyFields.has('email')}
                        ref={register}
                    />
                    <FormInput
                        type='text'
                        placeholder='Username'
                        name='username'
                        error={errors['username']}
                        touched={dirtyFields.has('username')}
                        Icon={AiOutlineUser}
                        ref={register}
                    />
                    <FormInput
                        type='password'
                        placeholder='Password'
                        Icon={FiLock}
                        name='password'
                        error={errors['password']}
                        touched={dirtyFields.has('password')}
                        ref={register}
                    />
                    <FormInput
                        name='passwordConfirm'
                        type='password'
                        placeholder='Confirm Password'
                        Icon={FiLock}
                        error={errors['passwordConfirm']}
                        touched={dirtyFields.has('passwordConfirm')}
                        ref={register}
                    />
                    <RoundButton
                        type='submit'
                        Icon={AiOutlineRight}
                        className='register-screen__basic__btn btn btn--round btn--secondary-gradient'
                    />
                </form>
            </div>
        );
    }
);
