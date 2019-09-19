import React from 'react';
import { useDispatch } from 'react-redux';
import { SmartInput, RoundButton } from '@/components';
import { useForm } from '@/custom-hooks';
import { login } from '@/actions';

interface IProps {
    errorMsg?: string;
}

export const LoginForm: React.FC<IProps> = React.memo(({ errorMsg }) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useForm({
        email: '',
        password: '',
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = inputs;
        e.preventDefault();
        dispatch(login(email, password));
    };

    const displayErrorMsg = () => {
        if (errorMsg) {
            return (
                <p className='body-text body-text--medium body-text--error auth-form__form__error-msg'>
                    {errorMsg}
                </p>
            );
        }
        return null;
    };

    return (
        <section className='auth-form'>
            <div className='auth-form__container'>
                <div className='auth-form__container__title title title--big'>
                    Sign in to <br />
                    Esport-Hatcher
                </div>
                <form className='auth-form__basic' onSubmit={onSubmit}>
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
                    <RoundButton onClick={() => null} />
                </form>
            </div>
        </section>
    );
});
