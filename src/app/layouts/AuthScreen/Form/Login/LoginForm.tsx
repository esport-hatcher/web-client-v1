import React, { useState, useCallback } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiMail, FiLock } from 'react-icons/fi';
import { SmartInput, IconButton } from 'app/components';
import { ReduxFormValues } from '../Register';
import { login } from 'app/actions';
import { useSelector } from 'app/custom-hooks';

interface IProps {}

const _LoginForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = React.memo(
    ({ handleSubmit }) => {
        const [loading, setLoading] = useState(false);
        const errorMsg = useSelector(
            state => state.authentication.errorMsg,
            shallowEqual
        );
        const dispatch = useDispatch();

        const onSubmit = useCallback(
            async (formValues: ReduxFormValues) => {
                setLoading(true);
                // tslint:disable-next-line: await-promise
                await dispatch(login(formValues));
                setLoading(false);
            },
            [dispatch, setLoading]
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
                        {errorMsg && errorMsg.login && (
                            <p className='body-text body-text--medium body-text--error login-screen__form__error-msg'>
                                {errorMsg.login}
                            </p>
                        )}
                        <IconButton
                            className='btn--primary-gradient btn--rounded-bottom login-screen__form__btn'
                            Icon={AiOutlineLogin}
                            loading={loading}
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
