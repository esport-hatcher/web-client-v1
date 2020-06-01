import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { SmartInput, RoundButton } from 'app/components';
import {
    required,
    isEmail,
    matchesPassword,
    isMin3Max20,
    isMin5Max20,
    isEmailAvailable,
} from 'app/shared';
import { AiOutlineRight } from 'react-icons/ai';
import { FiMail, FiLock } from 'react-icons/fi';

interface IProps {}

const _RegisterFormBasic: React.FC<IProps & InjectedFormProps<{}, IProps>> = ({
    handleSubmit,
}) => {
    return (
        <div className='register-screen__container'>
            <div className='register-screen__container__title title title--xl'>
                Register to <br />
                Esport-Hatcher
            </div>
            <form className='register-screen__basic' onSubmit={handleSubmit}>
                <Field
                    type='email'
                    placeholder='Email'
                    name='email'
                    Icon={FiMail}
                    component={SmartInput}
                    validate={[required, isEmail]}
                />
                <Field
                    type='text'
                    placeholder='Username'
                    component={SmartInput}
                    name='username'
                    validate={[required, isMin3Max20]}
                />
                <Field
                    type='password'
                    placeholder='Password'
                    component={SmartInput}
                    validate={[required, isMin5Max20]}
                    Icon={FiLock}
                    name='password'
                />
                <Field
                    name='passwordConfirm'
                    type='password'
                    component={SmartInput}
                    placeholder='Confirm Password'
                    Icon={FiLock}
                    validate={[required, matchesPassword]}
                />
                <RoundButton
                    type='submit'
                    Icon={AiOutlineRight}
                    className='register-screen__basic__btn btn btn--round btn--secondary-gradient'
                />
            </form>
        </div>
    );
};

export const RegisterFormBasic = reduxForm<{}, IProps>({
    form: 'register',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    asyncValidate: isEmailAvailable,
    asyncBlurFields: ['email'],
})(_RegisterFormBasic);
