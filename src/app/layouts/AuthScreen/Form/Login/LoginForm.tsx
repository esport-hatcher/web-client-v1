import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiMail, FiLock } from 'react-icons/fi';
import { SmartInput, IconButton } from 'app/components';
import { ReduxFormValues } from '../Register';
import { login, AsyncDispatch } from 'app/actions';

interface IProps {}

const _LoginForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = React.memo(
    ({ handleSubmit }) => {
        const [isLoading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const dispatch = useDispatch() as AsyncDispatch;

        const onSubmit = useCallback(
            async (formValues: ReduxFormValues) => {
                try {
                    setLoading(true);
                    await dispatch(login(formValues));
                } catch (err) {
                    setLoading(false);
                    setError(err);
                }
            },
            [dispatch, setLoading, setError]
        );

        return (
            <section className='login-screen'>
                <div className='login-screen__container'>
                    <div className='login-screen__container__title title title--big'>
                        Sign in to <br />
                        Esport-Hatcher
                    </div>
                    <form
                        className='login-screen__form'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Field
                            component={SmartInput}
                            type='email'
                            placeholder='Email'
                            name='email'
                            Icon={FiMail}
                            noValidation
                        />
                        <Field
                            component={SmartInput}
                            type='password'
                            placeholder='Password'
                            name='password'
                            Icon={FiLock}
                            noValidation
                        />
                        {error && (
                            <p className='body-text body-text--medium body-text--error login-screen__form__error-msg'>
                                {error}
                            </p>
                        )}
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
    }
);

export const LoginForm = reduxForm<{}, IProps>({
    form: 'login',
})(_LoginForm);
