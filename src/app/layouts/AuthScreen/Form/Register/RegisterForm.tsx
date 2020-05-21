import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { REGISTER_FORM_TRANSITION_MS } from 'app/config';
import { RegisterFormBasic, RegisterFormMore } from './forms';

export enum RegisterStage {
    basic,
    more,
    transition,
}

interface IProps {}

export const RegisterForm: React.FC<IProps> = React.memo(() => {
    const [stage, setStage] = useState<RegisterStage>(RegisterStage.basic);

    const goTo = useCallback(
        (stage: RegisterStage) => {
            setStage(RegisterStage.transition);
            setTimeout(() => setStage(stage), REGISTER_FORM_TRANSITION_MS);
        },
        [setStage]
    );

    const basicSubmit = React.useCallback(() => {
        goTo(RegisterStage.more);
    }, [goTo]);

    return (
        <section className='register-screen'>
            <CSSTransition
                in={stage === RegisterStage.basic}
                unmountOnExit
                mountOnEnter
                classNames='register-screen__container--basic'
                timeout={REGISTER_FORM_TRANSITION_MS}
            >
                <RegisterFormBasic onSubmit={basicSubmit} />
            </CSSTransition>
            <CSSTransition
                in={stage === RegisterStage.more}
                unmountOnExit
                mountOnEnter
                classNames='register-screen__container--more'
                timeout={REGISTER_FORM_TRANSITION_MS}
            >
                <RegisterFormMore goTo={goTo} />
            </CSSTransition>
        </section>
    );
});
