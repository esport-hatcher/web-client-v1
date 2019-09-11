import React, { Component } from 'react';
import { SmartInput, RoundButton } from '@/components';
import {
    isEmail,
    getMinMaxFunction,
    getCompareStringFunction,
} from '@/shared/utils';

interface IRegisterFormState {
    [key: string]: {
        value: string;
        valid: boolean;
    };
}

interface IRegisterFormProps {
    errorMsg?: string;
    onRegister: Function;
}

export class RegisterForm extends Component<
    IRegisterFormProps,
    IRegisterFormState
> {
    constructor(props: IRegisterFormProps) {
        super(props);
        this.state = {
            email: {
                value: '',
                valid: false,
            },
            username: {
                value: '',
                valid: false,
            },
            password: {
                value: '',
                valid: false,
            },
            passwordConfirm: {
                value: '',
                valid: false,
            },
        };
    }

    checkIfError = () => {
        const { email, username, password, passwordConfirm } = this.state;
        if (
            !email.valid ||
            !username.valid ||
            !password.valid ||
            !passwordConfirm.valid
        ) {
            return false;
        }
        return true;
    };

    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, username, password, passwordConfirm } = this.state;
        const { onRegister } = this.props;
        e.preventDefault();

        if (this.checkIfError()) {
            await onRegister(email.value, username.value, password.value);
        }
    };

    onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: {
                ...this.state[event.target.name],
                value: event.target.value,
            },
        });
    };

    onChangeStatus = (field: string, valid: boolean) => {
        this.setState({ [field]: { ...this.state[field], valid } });
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
        /**
         * Curried function who returns a function checking if a string is between 5 & 20 characters
         */
        const {
            password: { value },
        } = this.state;
        const minMaxPwd = getMinMaxFunction(5, 20);
        const minMaxUserName = getMinMaxFunction(3, 20);
        const compareString = getCompareStringFunction(value);

        return (
            <div className='auth-form'>
                <div className='auth-form__container'>
                    <div className='auth-form__container__title title title--big'>
                        Register to <br />
                        Esport-Hatcher
                    </div>
                    <form className='auth-form__form' onSubmit={this.onSubmit}>
                        <SmartInput
                            type='email'
                            placeholder='Email'
                            name='email'
                            register={true}
                            onChange={this.onChangeField}
                            onChangeStatus={this.onChangeStatus}
                            customValidation={isEmail}
                        />
                        <SmartInput
                            type='text'
                            placeholder='Username'
                            name='username'
                            register={true}
                            onChange={this.onChangeField}
                            onChangeStatus={this.onChangeStatus}
                            customValidation={minMaxUserName}
                        />
                        <SmartInput
                            type='password'
                            placeholder='Password'
                            name='password'
                            register={true}
                            onChange={this.onChangeField}
                            onChangeStatus={this.onChangeStatus}
                            customValidation={minMaxPwd}
                        />
                        <SmartInput
                            name='passwordConfirm'
                            type='password'
                            register={true}
                            placeholder='Confirm Password'
                            onChange={this.onChangeField}
                            onChangeStatus={this.onChangeStatus}
                            customValidation={compareString}
                        />
                        {this.displayErrorMsg()}
                        <RoundButton onClick={() => null} />
                    </form>
                </div>
            </div>
        );
    }
}
