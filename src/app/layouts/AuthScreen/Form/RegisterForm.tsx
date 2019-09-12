import React, { Component } from 'react';
import { RegisterFormBasic } from './forms/RegisterFormBasic';
import { RegisterFormMore } from './forms/RegisterFormMore';
import { registerFormFill, IRegisterProps } from '@/actions';

export enum RegisterFormStages {
    basic,
    more,
}

interface IRegisterFormProps {
    errorMsg?: string;
    stage: RegisterFormStages;
    setStage: (stage: RegisterFormStages) => void;
    onSubmit: Function;
    onChangeFields: typeof registerFormFill;
    fieldsValue: IRegisterProps;
}

export interface IRegisterFormState {
    stage: RegisterFormStages;
}

export class RegisterForm extends Component<
    IRegisterFormProps,
    IRegisterFormState
> {
    constructor(props: IRegisterFormProps) {
        super(props);
        this.state = { stage: this.props.stage };
    }

    _setStage = (stage: RegisterFormStages) => {
        this.setState({ stage });
        this.props.setStage(stage);
    };

    renderForm = () => {
        const { stage } = this.state;
        const { onSubmit, errorMsg, onChangeFields, fieldsValue } = this.props;

        switch (stage) {
            case RegisterFormStages.basic:
                return (
                    <RegisterFormBasic
                        setNextStage={this._setStage}
                        errorMsg={errorMsg}
                        onChangeFields={onChangeFields}
                        fieldsValue={fieldsValue}
                    />
                );
            case RegisterFormStages.more:
                return (
                    <RegisterFormMore
                        onSubmit={onSubmit}
                        errorMsg={errorMsg}
                        onChangeFields={onChangeFields}
                        fieldsValue={fieldsValue}
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
