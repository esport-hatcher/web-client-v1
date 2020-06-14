import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiMail, FiLock } from 'react-icons/fi';
import { IconButton, FormInput } from 'app/components';
import { login, AsyncDispatch, IFormValues } from 'app/actions';

interface IProps {}

export const LoginForm: React.FC<IProps> = React.memo(() => {
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch() as AsyncDispatch;

    const onSubmit = useCallback(
        async (formValues: IFormValues) => {
            try {
                setLoading(true);
                await dispatch(login(formValues));
            } catch (err) {
                setLoading(false);
            }
        },
        [dispatch, setLoading]
    );

    return (
        <section className='login-screen'>
            <div className='login-screen__container'>
                <div className='login-screen__container__title title title--xl'>
                    Sign in to <br />
                    Esport-Hatcher
                </div>
                <form
                    className='login-screen__form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormInput
                        type='email'
                        placeholder='Email'
                        name='email'
                        noValidation
                        Icon={FiMail}
                        ref={register}
                    />
                    <FormInput
                        type='password'
                        placeholder='Password'
                        name='password'
                        noValidation
                        Icon={FiLock}
                        ref={register}
                    />
                    <IconButton
                        className='btn--primary-gradient btn--rounded-bottom login-screen__form__btn'
                        Icon={AiOutlineLogin}
                        loading={isLoading}
                        type='submit'
                    >
                        Login
                    </IconButton>
                </form>
            </div>
        </section>
    );
});
