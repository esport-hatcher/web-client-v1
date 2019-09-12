import React, { Component } from 'react';
import { SmartInput, RoundButton } from '@/components';
import { registerFormFill, IRegisterProps } from '@/actions';

interface IRegisterFormMoreProps {
    onSubmit: Function;
    errorMsg?: string;
    onChangeFields: typeof registerFormFill;
    fieldsValue: IRegisterProps;
    // registerFormProps: IRegisterFormProps;
}

interface IRegisterFormMoreState {
    [key: string]: {
        value: string;
        valid: boolean;
    };
}

export class RegisterFormMore extends Component<
    IRegisterFormMoreProps,
    IRegisterFormMoreState
> {
    checkIfError = () => {
        const { firstName, lastName } = this.state;
        if (!firstName.valid || !lastName.valid) {
            return false;
        }
        return true;
    };

    onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const { onSubmit, fieldsValue } = this.props;
        e.preventDefault();

        if (this.checkIfError()) {
            onSubmit(fieldsValue);
        }
    };

    onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChangeFields, fieldsValue } = this.props;

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

        return (
            <React.Fragment>
                <div className='auth-form__container__title title title--big'>
                    Tell us more about yourself
                </div>
                <form className='auth-form__form' onSubmit={this.onSubmit}>
                    <SmartInput
                        value={this.props.fieldsValue.firstName.value}
                        type='text'
                        placeholder='First name'
                        name='firstName'
                        register={true}
                        onChange={this.onChangeField}
                        onChangeStatus={this.onChangeStatus}
                        customValidation={() => true}
                    />
                    <SmartInput
                        value={this.props.fieldsValue.lastName.value}
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
