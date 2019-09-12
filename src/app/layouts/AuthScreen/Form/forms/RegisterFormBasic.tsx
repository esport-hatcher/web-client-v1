import React, { Component } from 'react';
import { SmartInput, RoundButton } from '@/components';
import { RegisterFormStages } from '../RegisterForm';
import { registerFormFill, IRegisterProps } from '@/actions';
import {
    isEmail,
    getMinMaxFunction,
    getCompareStringFunction,
} from '@/shared/utils';

interface IRegisterFormBasicProps {
    onChangeFields: typeof registerFormFill;
    setNextStage: (stage: RegisterFormStages) => void;
    fieldsValue: IRegisterProps;
    errorMsg?: string;
}

export class RegisterFormBasic extends Component<IRegisterFormBasicProps> {
    checkIfError = () => {
        const {
            email,
            username,
            password,
            passwordConfirm,
        } = this.props.fieldsValue;
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
        const { setNextStage } = this.props;

        e.preventDefault();

        if (this.checkIfError()) {
            setNextStage(RegisterFormStages.more);
        }
    };

    onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChangeFields, fieldsValue } = this.props;

        // console.log(event.target.name);
        onChangeFields({
            ...fieldsValue,
            [event.target.name]: {
                ...fieldsValue[event.target.name as keyof IRegisterProps],
                value: event.target.value,
            },
        });
    };

    onChangeStatus = (field: string, valid: boolean) => {
        const { fieldsValue, onChangeFields } = this.props;

        onChangeFields({
            ...fieldsValue,
            [field]: {
                ...fieldsValue[field as keyof IRegisterProps],
                valid,
            },
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
        /**
         * Curried function who returns a function checking if a string is between 5 & 20 characters
         */
        const {
            password: { value },
        } = this.props.fieldsValue;
        const minMaxPwd = getMinMaxFunction(5, 20);
        const minMaxUserName = getMinMaxFunction(3, 20);
        const compareString = getCompareStringFunction(value);

        return (
            <React.Fragment>
                <div className='auth-form__container__title title title--big'>
                    Register to <br />
                    Esport-Hatcher
                </div>
                <form className='auth-form__form' onSubmit={this.onSubmit}>
                    <SmartInput
                        value={this.props.fieldsValue.email.value}
                        type='email'
                        placeholder='Email'
                        name='email'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={isEmail}
                    />
                    <SmartInput
                        value={this.props.fieldsValue.username.value}
                        type='text'
                        placeholder='Username'
                        name='username'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={minMaxUserName}
                    />
                    <SmartInput
                        value={this.props.fieldsValue.password.value}
                        type='password'
                        placeholder='Password'
                        name='password'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={minMaxPwd}
                    />
                    <SmartInput
                        value={this.props.fieldsValue.passwordConfirm.value}
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
            </React.Fragment>
        );
    }
}
