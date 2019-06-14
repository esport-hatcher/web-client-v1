import React, { Component } from 'react';
import { isEmail, getMinMaxFunction } from '@/shared/utils';
import SmartInput from '@/components/SmartInput';
import RoundButton from '@/components/RoundButton/index';
import { getCompareStringFunction } from '../../shared/utils';

interface IAuthFormP {
    loginMode: boolean;
}

export class AuthForm extends Component<IAuthFormP> {
    // tslint:disable-next-line: no-any
    state: any = {
        email: null,
        username: '',
        password: '',
        passwordConfirm: '',
    };

    // tslint:disable-next-line: no-any
    onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        // tslint:disable-next-line: no-console
        this.setState({ [event.target.name]: event.target.value });
    };

    userNameField = () => {
        const { loginMode } = this.props;

        if (!loginMode) {
            const minMaxUserName = getMinMaxFunction(3, 20);
            return (
                <SmartInput
                    type='text'
                    placeholder='username'
                    name='username'
                    onChange={this.onChangeField}
                    customValidation={minMaxUserName}
                />
            );
        }
    };

    confirmPwdField = () => {
        const { loginMode } = this.props;

        if (!loginMode) {
            const compareString = getCompareStringFunction(this.state.password);
            return (
                <SmartInput
                    name='passwordConfirm'
                    type='password'
                    placeholder='Confirm Password'
                    onChange={this.onChangeField}
                    customValidation={compareString}
                />
            );
        }
    };

    render() {
        const { loginMode } = this.props;
        const minMaxPwd = getMinMaxFunction(5, 20);

        return (
            <div className='auth-form'>
                <div className='auth-form__container'>
                    <div className='auth-form__container__title title title--big'>
                        {`${
                            loginMode
                                ? 'Sign in to Esport-Hatcher'
                                : 'Register to Esport-Hatcher'
                        }`}
                    </div>
                    <form className='auth-form__form'>
                        <SmartInput
                            type='email'
                            placeholder='email'
                            name='email'
                            register={!loginMode}
                            onChange={this.onChangeField}
                            customValidation={isEmail}
                        />
                        {this.userNameField()}
                        <SmartInput
                            type='password'
                            placeholder='password'
                            name='password'
                            onChange={this.onChangeField}
                            customValidation={minMaxPwd}
                        />
                        {this.confirmPwdField()}
                        <RoundButton />
                    </form>
                </div>
            </div>
        );
    }
}

export default AuthForm;
