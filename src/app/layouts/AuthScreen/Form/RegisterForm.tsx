import React, { Component } from 'react';
import { RegisterFormBasic } from './forms/RegisterFormBasic';
import { RegisterFormMore } from './forms/RegisterFormMore';
import {
    registerFormFill,
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';

interface IRegisterFormProps {
    errorMsg?: string;
    stage: RegisterFormStages;
    setStage: typeof registerFormSetStage;
    onSubmit: Function;
    onChangeFields: typeof registerFormFill;
    fields: IRegisterProps;
}

export class RegisterForm extends Component<IRegisterFormProps> {
    renderForm = () => {
        const {
            onSubmit,
            errorMsg,
            onChangeFields,
            fields,
            setStage,
            stage,
        } = this.props;

        switch (stage) {
            case RegisterFormStages.basic:
                return (
                    <RegisterFormBasic
                        setStage={setStage}
                        errorMsg={errorMsg}
                        onChangeFields={onChangeFields}
                        fields={fields}
                        stage={stage}
                    />
                );
            case RegisterFormStages.more:
                return (
                    <RegisterFormMore
                        onSubmit={onSubmit}
                        errorMsg={errorMsg}
                        onChangeFields={onChangeFields}
                        fields={fields}
                        stage={stage}
                        setStage={setStage}
                    />
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <div className='auth-form'>
                <div className='auth-form__container'>{this.renderForm()}</div>
            </div>
        );
    }
}
