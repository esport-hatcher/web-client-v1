import React from 'react';
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

export const RegisterForm = ({
    errorMsg,
    stage,
    setStage,
    onSubmit,
    onChangeFields,
    fields,
}: IRegisterFormProps): JSX.Element => {
    return (
        <div className='auth-form'>
            <RegisterFormBasic
                setStage={setStage}
                errorMsg={errorMsg}
                onChangeFields={onChangeFields}
                fields={fields}
                stage={stage}
            />

            <RegisterFormMore
                onSubmit={onSubmit}
                errorMsg={errorMsg}
                onChangeFields={onChangeFields}
                fields={fields}
                stage={stage}
                setStage={setStage}
            />
        </div>
    );
};
