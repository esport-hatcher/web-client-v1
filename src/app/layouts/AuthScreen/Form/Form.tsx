import React, { Component } from 'react';
import { isEmail, getMinMaxFunction } from '@/shared/utils';
import SmartInput from '@/components/SmartInput';
import RoundButton from '@/components/RoundButton/index';
import { getCompareStringFunction } from '../../../shared/utils';
import { SERVER_ERROR } from '@/actions/types';

interface IAuthFormP {
    /**
     * Is the form used to login or register ?
     */
    loginMode: boolean;
    /**
     * Is their any error from Redux ?
     */
    errorMsg?: string;
    /**
     * When logging execute this function
     */
    // tslint:disable-next-line: no-any
    onLogin: (email: string, password: string) => Promise<void>;
    /**
     * When register execute this function
     */
    onRegister: (
        email: string,
        username: string,
        password: string
    ) => Promise<void>;
}

export class AuthForm extends Component<IAuthFormP> {
    // tslint:disable-next-line: no-any
    state: any = {
        email: {
            value: null,
            valid: false,
        },
        username: {
            value: null,
            valid: false,
        },
        password: {
            value: null,
            valid: false,
        },
        passwordConfirm: {
            value: null,
            valid: false,
        },
    };

    /**
     * Keep a trace of the value for each field
     */
    // tslint:disable-next-line: no-any
    onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        // tslint:disable-next-line: no-console
        this.setState({
            [event.target.name]: {
                ...this.state[event.target.name],
                value: event.target.value,
            },
        });
    };

    /**
     * Keep a trace of the validity of each field => (valid || not valid)
     */
    onChangeStatus = (field: string, valid: boolean) => {
        this.setState({ [field]: { ...this.state[field], valid } });
    };

    /**
     * Check if one of the fields is not valid
     */
    checkIfError = () => {
        const { email, username, password, passwordConfirm } = this.state;
        const { loginMode } = this.props;

        if (loginMode) {
            if (!email.valid || !password.valid) {
                return false;
            }
            return true;
        }
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

    /**
     * If register then it render the username field
     */
    userNameField = () => {
        const { loginMode } = this.props;

        if (!loginMode) {
            const minMaxUserName = getMinMaxFunction(3, 20);
            return (
                <SmartInput
                    type='text'
                    placeholder='username'
                    name='username'
                    register={true}
                    onChange={this.onChangeField}
                    onChangeStatus={this.onChangeStatus}
                    customValidation={minMaxUserName}
                />
            );
        }
    };

    /**
     * If register then it render the confirm password field
     */
    confirmPwdField = () => {
        const { loginMode } = this.props;
        const {
            password: { value },
        } = this.state;

        if (!loginMode) {
            /**
             * Init the comparator function between confirm_pwd and pwd
             */
            const compareString = getCompareStringFunction(value);
            return (
                <SmartInput
                    name='passwordConfirm'
                    type='password'
                    register={true}
                    placeholder='Confirm Password'
                    onChange={this.onChangeField}
                    onChangeStatus={this.onChangeStatus}
                    customValidation={compareString}
                />
            );
        }
    };

    /**
     * Render the error message if stored in the redux store
     */
    displayErrorMsg = () => {
        const { errorMsg, loginMode } = this.props;

        if (errorMsg && (loginMode || errorMsg === SERVER_ERROR)) {
            return (
                <p className='body-text body-text--medium body-text--error auth-form__form__error-msg'>
                    {errorMsg}
                </p>
            );
        }
        return null;
    };

    /**
     * Function called when submitting the form
     */
    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { email, username, password } = this.state;
        const { loginMode, onLogin, onRegister } = this.props;

        /**
         * Prevent page from reloading
         */
        e.preventDefault();
        /**
         * Check if any error on the fields, if not then submit the form
         */
        if (loginMode) {
            await onLogin(email.value, password.value);
        } else {
            if (this.checkIfError()) {
                await onRegister(email.value, username.value, password.value);
            }
        }
    };

    /**
     * renderer
     */
    render() {
        const { loginMode } = this.props;
        /**
         * Curried function who returns a function checking if a string is between 5 & 20 characters
         */
        const minMaxPwd = getMinMaxFunction(5, 20);

        return (
            <div className='auth-form'>
                <div className='auth-form__container'>
                    <div className='auth-form__container__title title title--big'>
                        {`${loginMode ? 'Sign in' : 'Register'}`} to <br />
                        Esport-Hatcher
                    </div>
                    <form className='auth-form__form' onSubmit={this.onSubmit}>
                        <SmartInput
                            type='email'
                            placeholder='email'
                            name='email'
                            register={!loginMode}
                            onChange={this.onChangeField}
                            onChangeStatus={
                                loginMode ? undefined : this.onChangeStatus
                            }
                            customValidation={isEmail}
                        />
                        {this.userNameField()}
                        <SmartInput
                            type='password'
                            placeholder='password'
                            name='password'
                            register={!loginMode}
                            onChange={this.onChangeField}
                            onChangeStatus={
                                loginMode ? undefined : this.onChangeStatus
                            }
                            customValidation={minMaxPwd}
                        />
                        {this.confirmPwdField()}
                        {this.displayErrorMsg()}
                        <RoundButton />
                    </form>
                </div>
            </div>
        );
    }
}

export default AuthForm;
