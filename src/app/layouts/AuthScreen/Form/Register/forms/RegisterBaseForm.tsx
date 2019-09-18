import React, { Component } from 'react';
import {
    registerFormFill,
    IRegisterProps,
    RegisterFormStages,
    registerFormSetStage,
} from '@/actions';

interface IProps {
    onChangeFields: typeof registerFormFill;
    fields: IRegisterProps;
    stage: RegisterFormStages;
    setStage: typeof registerFormSetStage;
    errorMsg?: string;
}

export abstract class RegisterBaseForm<P extends IProps> extends Component<P> {
    onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChangeFields, fields } = this.props;

        onChangeFields({
            ...fields,
            [event.target.name]: {
                ...fields[event.target.name as keyof IRegisterProps],
                value: event.target.value,
            },
        });
    };

    onChangeStatus = (field: string, valid: boolean) => {
        const { fields, onChangeFields } = this.props;

        onChangeFields({
            ...fields,
            [field]: {
                ...fields[field as keyof IRegisterProps],
                valid,
            },
        });
    };

    isStageMore = (): boolean => this.props.stage === RegisterFormStages.more;

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
}
