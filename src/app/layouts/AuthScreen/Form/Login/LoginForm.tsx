import React, { Component } from 'react';
import { SmartInput, RoundButton } from '@/components';

interface ILoginFormProps {
    onLogin: (email: string, password: string) => Promise<void>;
    errorMsg?: string;
}

interface ILoginFormState {
    [key: string]: string;
}

export class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = this.state;
        const { onLogin } = this.props;
        e.preventDefault();
        await onLogin(email, password);
    };

    onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    displayErrorMsg = () => {
        const { errorMsg } = this.props;

        if (errorMsg) {
            return (
                <p className='body-text body-text--medium body-text--error auth-form__form__error-msg'>
                    {errorMsg}
                </p>
            );
        }
        return null;
    };

    render() {
        return (
            <div className='auth-form'>
                <div className='auth-form__container'>
                    <div className='auth-form__container__title title title--big'>
                        Sign in to <br />
                        Esport-Hatcher
                    </div>
                    <form className='auth-form__basic' onSubmit={this.onSubmit}>
                        <SmartInput
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={this.onChangeField}
                        />
                        <SmartInput
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={this.onChangeField}
                        />
                        {this.displayErrorMsg()}
                        <RoundButton onClick={() => null} />
                    </form>
                </div>
            </div>
        );
    }
}
