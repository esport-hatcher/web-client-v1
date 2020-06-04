import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { REGISTER_FORM_TRANSITION_MS } from 'app/config';
import { useWizardForm } from 'app/custom-hooks';
import { IFormValues, register } from 'app/actions';
import { RegisterFormBasic, RegisterFormMore } from './forms';

export enum RegisterStage {
    basic,
    more,
    transition,
}

interface IProps {}

export const RegisterForm: React.FC<IProps> = React.memo(() => {
    const [stage, setStage] = useState<RegisterStage>(RegisterStage.basic);
    const { updateForm, resetForm, formValues } = useWizardForm('register');
    const dispatch = useDispatch();

    const goTo = useCallback(
        (stage: RegisterStage) => {
            setStage(RegisterStage.transition);
            setTimeout(() => setStage(stage), REGISTER_FORM_TRANSITION_MS);
        },
        [setStage]
    );

    const basicSubmit = React.useCallback(
        (formValues: IFormValues) => {
            dispatch(updateForm(formValues));
            goTo(RegisterStage.more);
        },
        [goTo, updateForm, dispatch]
    );

    const moreSubmit = React.useCallback(
        async (_formValues: IFormValues) => {
            try {
                dispatch(updateForm(_formValues));
                // tslint:disable-next-line: await-promise
                await dispatch(register({ ...formValues, ..._formValues }));
                dispatch(resetForm());
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            }
        },
        [resetForm, updateForm, dispatch, formValues]
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
                <RegisterFormBasic onSubmit={basicSubmit} />
            </CSSTransition>
            <CSSTransition
                in={stage === RegisterStage.more}
                unmountOnExit
                mountOnEnter
                classNames='register-screen__container--more'
                timeout={REGISTER_FORM_TRANSITION_MS}
            >
                <RegisterFormMore goTo={goTo} onSubmit={moreSubmit} />
            </CSSTransition>
        </section>
    );
});
