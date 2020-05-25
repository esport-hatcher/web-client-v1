import React, { useState, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useRegisterForm } from 'app/custom-hooks';
import { REGISTER_FORM_TRANSITION_MS } from 'app/config';
import { RegisterFormBasic, RegisterFormMore } from './forms';

export enum RegisterStage {
    basic,
    more,
    transition,
}

interface IProps {
    errorMsg?: string;
}

export const RegisterForm: React.FC<IProps> = React.memo(({ errorMsg }) => {
    const [stage, setStage] = useState<RegisterStage>(RegisterStage.basic);
    const fields = useSelector(
        state => state.registerForm.fields,
        shallowEqual
    );

    const { onChangeStatus, onChangeValue } = useRegisterForm();

    const goTo = useCallback(
        (stage: RegisterStage) => {
            setStage(RegisterStage.transition);
            setTimeout(() => setStage(stage), REGISTER_FORM_TRANSITION_MS);
        },
        [setStage]
    );

    return (
        <section className='register-screen'>
            <CSSTransition
                in={stage === RegisterStage.basic}
                unmountOnExit
                mountOnEnter
                classNames='register-screen__container--basic'
                timeout={REGISTER_FORM_TRANSITION_MS}
            >
                <RegisterFormBasic
                    goTo={goTo}
                    errorMsg={errorMsg}
                    onChangeValue={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    fields={fields}
                />
            </CSSTransition>
            <CSSTransition
                in={stage === RegisterStage.more}
                unmountOnExit
                mountOnEnter
                classNames='register-screen__container--more'
                timeout={REGISTER_FORM_TRANSITION_MS}
            >
                <RegisterFormMore
                    goTo={goTo}
                    errorMsg={errorMsg}
                    onChangeValue={onChangeValue}
                    onChangeStatus={onChangeStatus}
                    fields={fields}
                />
            </CSSTransition>
        </section>
    );
});
