import React from 'react';
import { SmartInput, RoundButton } from '@/components';
import { RegisterBaseForm } from './RegisterBaseForm';
import { isNotEmpty } from '@/shared/utils';
import {
    registerFormFill,
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
    IRegisterForm,
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
        return (
            <div
                className={`auth-form__container auth-form__container__more ${
                    this.isStageMore()
                        ? 'auth-form__container__more--active'
                        : ''
                }`}
            >
                <div className='auth-form__container__title title title--big'>
                    Tell us more about yourself
                </div>
                <form className='auth-form__basic' onSubmit={this.onSubmit}>
                    <SmartInput
                        value={this.props.fields.firstName.value}
                        type='text'
                        placeholder='First name'
                        name='firstName'
                        icon='pen'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={isNotEmpty}
                    />
                    <SmartInput
                        value={this.props.fields.lastName.value}
                        type='text'
                        icon='pen'
                        placeholder='Last name'
                        name='lastName'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={isNotEmpty}
                    />
                    {this.displayErrorMsg()}
                    <RoundButton onClick={() => null} />
                </form>
            </div>
        );
    }
}
