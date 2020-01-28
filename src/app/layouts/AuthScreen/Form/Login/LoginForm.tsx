import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SmartInput, IconButton } from 'app/components';
import { useForm } from 'app/custom-hooks';
import { login } from 'app/actions';
import { FAKE_LOADING_TIME } from 'app/config';

interface IProps {
    errorMsg?: string;
}

export const LoginForm: React.FC<IProps> = React.memo(({ errorMsg }) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useForm({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = inputs;
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            dispatch(login(email, password));
            setLoading(false);
        }, FAKE_LOADING_TIME);
    };

    const displayErrorMsg = () => {
        if (errorMsg) {
            return (
                <p className='body-text body-text--medium body-text--error login-screen__form__error-msg'>
                    {errorMsg}
                </p>
            );
        }
        return null;
    };

    return (
        <section className='login-screen'>
            <div className='login-screen__container'>
                <div className='login-screen__container__title title title--big'>
                    Sign in to <br />
                    Esport-Hatcher
                </div>
                <form className='login-screen__form' onSubmit={onSubmit}>
                    <SmartInput
                        type='email'
                        placeholder='Email'
                        name='email'
                        icon='mail'
                        value={inputs.email}
                        onChange={setInputs}
                    />
                    <SmartInput
                        type='password'
                        placeholder='Password'
                        name='password'
                        icon='lock'
                        value={inputs.password}
                        onChange={setInputs}
                    />
                    {displayErrorMsg()}
                    <IconButton
                        className='btn--primary-gradient btn--rounded-bottom login-screen__form__btn'
                        icon='chevron_right'
                        loading={loading}
                    >
                        Login
                    </IconButton>
                </form>
            </div>
        </section>
    );
});
