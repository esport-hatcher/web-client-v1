import React from 'react';
import { RegisterFormBasic } from './forms/RegisterFormBasic';
import { RegisterFormMore } from './forms/RegisterFormMore';
import {
    registerFormFill,
    registerFormSetStage,
    IRegisterProps,
    RegisterFormStages,
} from '@/actions';

interface IProps {
    errorMsg?: string;
    stage: RegisterFormStages;
    setStage: typeof registerFormSetStage;
    onSubmit: Function;
    onChangeFields: typeof registerFormFill;
    fields: IRegisterProps;
}

export const RegisterForm: React.FC<IProps> = ({
    errorMsg,
    stage,
    setStage,
    onSubmit,
    onChangeFields,
    fields,
}) => {
    return (
        <section className='auth-form'>
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
        </section>
    );
};
