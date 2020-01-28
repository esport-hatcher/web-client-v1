import React from 'react';
import { shallowEqual } from 'react-redux';
import { useSelector, useRegisterForm } from 'app/custom-hooks';
import { RegisterFormStages } from 'app/actions';
import { RegisterFormBasic } from './forms/RegisterFormBasic';
import { RegisterFormMore } from './forms/RegisterFormMore';

interface IProps {
    errorMsg?: string;
    stage: RegisterFormStages;
}

export const RegisterForm: React.FC<IProps> = React.memo(
    ({ errorMsg, stage }) => {
        const fields = useSelector(
            state => state.registerForm.fields,
            shallowEqual
        );

        const { onChangeStatus, onChangeValue, setStage } = useRegisterForm();

        return (
            <section className='register-screen'>
                <RegisterFormBasic
                    setStage={setStage}
                    errorMsg={errorMsg}
                    onChangeValue={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    fields={fields}
                    stage={stage}
                />
                <RegisterFormMore
                    errorMsg={errorMsg}
                    onChangeValue={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    fields={fields}
                    stage={stage}
                    setStage={setStage}
                />
            </section>
        );
    }
);
