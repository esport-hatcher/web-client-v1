import React, { Component } from 'react';
import { SmartInput, RoundButton } from '@/components';
import { RegisterBaseForm } from './RegisterBaseForm';
import { IRegisterForm } from '../../../../actions/authentication';
import {
    registerFormFill,
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';

interface IRegisterFormMoreProps {
    onSubmit: Function;
    errorMsg?: string;
    onChangeFields: typeof registerFormFill;
    fields: IRegisterProps;
    stage: RegisterFormStages;
    setStage: typeof registerFormSetStage;
}

export class RegisterFormMore extends RegisterBaseForm<IRegisterFormMoreProps> {
    checkIfError = () => {
        const { firstName, lastName } = this.props.fields;
        if (!firstName.valid || !lastName.valid) {
            return false;
        }
        return true;
    };

    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit, fields } = this.props;
        const fieldsValue: IRegisterForm = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
        };

        e.preventDefault();

        for (const key in fields) {
            if (key !== 'passwordConfirm') {
                fieldsValue[key as keyof IRegisterForm] =
                    fields[key as keyof IRegisterProps].value;
            }
        }

        if (this.checkIfError()) {
            onSubmit(fieldsValue);
        }
    };

    render() {
        /**
         * Curried function who returns a function checking if a string is between 5 & 20 characters
         */

        return (
            <React.Fragment>
                <div className='auth-form__container__title title title--big'>
                    Tell us more about yourself
                </div>
                <form className='auth-form__form' onSubmit={this.onSubmit}>
                    <SmartInput
                        value={this.props.fields.firstName.value}
                        type='text'
                        placeholder='First name'
                        name='firstName'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={() => true}
                    />
                    <SmartInput
                        value={this.props.fields.lastName.value}
                        type='text'
                        placeholder='Last name'
                        name='lastName'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={() => true}
                    />
                    {this.displayErrorMsg()}
                    <RoundButton onClick={() => null} />
                </form>
            </React.Fragment>
        );
    }
}
