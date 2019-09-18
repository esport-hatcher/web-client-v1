import React from 'react';
import { SmartInput, RoundButton } from '@/components';
import { RegisterBaseForm } from './RegisterBaseForm';
import {
    registerFormFill,
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';
import {
    isEmail,
    getMinMaxFunction,
    getCompareStringFunction,
} from '@/shared/utils';

interface IProps {
    onChangeFields: typeof registerFormFill;
    setStage: typeof registerFormSetStage;
    fields: IRegisterProps;
    stage: RegisterFormStages;
    errorMsg?: string;
}

export class RegisterFormBasic extends RegisterBaseForm<IProps> {
    checkIfError = () => {
        const {
            email,
            username,
            password,
            passwordConfirm,
        } = this.props.fields;
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
        const { setStage } = this.props;

        e.preventDefault();

        if (this.checkIfError()) {
            setStage(RegisterFormStages.more);
        }
    };

    render() {
        const {
            password: { value },
        } = this.props.fields;
        /**
         * Curried function who returns a function checking if a string is between 5 & 20 characters
         */
        const minMaxPwd = getMinMaxFunction(5, 20);
        const minMaxUserName = getMinMaxFunction(3, 20);
        const compareString = getCompareStringFunction(value);

        return (
            <section
                className={`auth-form__container auth-form__container__basic ${
                    !this.isStageMore()
                        ? 'auth-form__container__basic--active'
                        : ''
                }`}
            >
                <div className='auth-form__container__title title title--big'>
                    Register to <br />
                    Esport-Hatcher
                </div>
                <form className='auth-form__basic' onSubmit={this.onSubmit}>
                    <SmartInput
                        icon='mail'
                        value={this.props.fields.email.value}
                        type='email'
                        placeholder='Email'
                        name='email'
                        register={true}
                        required={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={isEmail}
                    />
                    <SmartInput
                        icon='pen'
                        required={true}
                        value={this.props.fields.username.value}
                        type='text'
                        placeholder='Username'
                        name='username'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={minMaxUserName}
                    />
                    <SmartInput
                        icon='lock'
                        required={true}
                        value={this.props.fields.password.value}
                        type='password'
                        placeholder='Password'
                        name='password'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={minMaxPwd}
                    />
                    <SmartInput
                        required={true}
                        icon='lock'
                        value={this.props.fields.passwordConfirm.value}
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
            </section>
        );
    }
}
