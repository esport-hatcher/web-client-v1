import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiMail, FiLock } from 'react-icons/fi';
import { IconButton } from 'app/components';
import { ReduxFormValues } from '../Register';
import { login, AsyncDispatch } from 'app/actions';
import { FormInput } from 'app/components/shared/Inputs/FormInput';
import { useForm } from 'react-hook-form';

interface IProps {}

export const LoginForm: React.FC<IProps> = React.memo(() => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch() as AsyncDispatch;
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = useCallback(
        async (formValues: ReduxFormValues) => {
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
                        ref={register({ required: true })}
                    />
                    <FormInput
                        type='password'
                        placeholder='Password'
                        name='password'
                        ref={register({ required: true })}
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
