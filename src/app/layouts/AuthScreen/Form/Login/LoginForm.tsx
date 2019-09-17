import React from 'react';
import { SmartInput, RoundButton } from '@/components';
import { useMultipleInputs } from '@/hooks';

interface ILoginFormProps {
    onLogin: (email: string, password: string) => Promise<void>;
    errorMsg?: string;
}

export const LoginForm = ({
    onLogin,
    errorMsg,
}: ILoginFormProps): JSX.Element => {
    const [inputs, setInputs] = useMultipleInputs({
        email: '',
        password: '',
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = inputs;
        e.preventDefault();
        await onLogin(email, password);
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
        <div className='auth-form'>
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
        </div>
    );
};
