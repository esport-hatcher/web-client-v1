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

interface IProps {}

const _RegisterFormBasic: React.FC<IProps & InjectedFormProps<{}, IProps>> = ({
    handleSubmit,
}) => {
    return (
        <div className='register-screen__container'>
            <div className='register-screen__container__title title title--big'>
                Register to <br />
                Esport-Hatcher
            </div>
            <form className='register-screen__basic' onSubmit={handleSubmit}>
                <Field
                    icon='envelope'
                    type='email'
                    placeholder='Email'
                    name='email'
                    component={SmartInput}
                    validate={[required, isEmail]}
                />
                <Field
                    icon='pen'
                    type='text'
                    placeholder='Username'
                    component={SmartInput}
                    name='username'
                    validate={[required, isMin3Max20]}
                />
                <Field
                    icon='lock'
                    type='password'
                    placeholder='Password'
                    component={SmartInput}
                    validate={[required, isMin5Max20]}
                    name='password'
                />
                <Field
                    icon='lock'
                    name='passwordConfirm'
                    type='password'
                    component={SmartInput}
                    placeholder='Confirm Password'
                    validate={[required, matchesPassword]}
                />
                <RoundButton
                    type='submit'
                    icon='chevron-right'
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
