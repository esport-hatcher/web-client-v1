import React, { useCallback, useState } from 'react';
import capitalize from 'capitalize';
import { InjectedFormProps, reduxForm, Field, reset } from 'redux-form';
import { useDispatch } from 'react-redux';
import { SmartInput, IconButton, RoundButton } from 'app/components';
import { normalizePhone, required } from 'app/shared';

import { register } from 'app/actions';
import { RegisterStage } from '../RegisterForm';
import { AiOutlineLeft, AiOutlineLogin } from 'react-icons/ai';

export type ReduxFormValues = { [key: string]: string };

interface IProps {
    goTo: Function;
}

const _RegisterFormMore: React.FC<IProps & InjectedFormProps<{}, IProps>> = ({
    goTo,
    handleSubmit,
}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onGoBack = useCallback(() => {
        goTo(RegisterStage.basic);
    }, [goTo]);

    const onSubmit = useCallback(
        async (formValues: ReduxFormValues) => {
            setLoading(true);
            // tslint:disable-next-line: await-promise
            await dispatch(register(formValues));
            setLoading(false);
            dispatch(reset('register'));
        },
        [dispatch, setLoading]
    );

    return (
        <div className='register-screen__container'>
            <div className='register-screen__container__title title title--xl'>
                Tell us more about you
            </div>

            <form
                className='register-screen__more'
                onSubmit={handleSubmit(onSubmit)}
            >
                <RoundButton
                    type='button'
                    onClick={onGoBack}
                    Icon={AiOutlineLeft}
                    className='register-screen__more__btn-back btn btn--round btn--secondary-gradient'
                />
                <Field
                    component={SmartInput}
                    type='text'
                    placeholder='First name'
                    name='firstName'
                    normalize={capitalize}
                    validate={[required]}
                />
                <Field
                    component={SmartInput}
                    type='text'
                    icon='portrait'
                    placeholder='Last name'
                    name='lastName'
                    normalize={capitalize}
                    validate={[required]}
                />
                <Field
                    component={SmartInput}
                    type='text'
                    icon='map-pin'
                    placeholder='City'
                    name='city'
                    normalize={capitalize}
                    validate={[required]}
                />
                <Field
                    component={SmartInput}
                    type='text'
                    icon='map-pin'
                    placeholder='Country'
                    name='country'
                    normalize={capitalize}
                    validate={[required]}
                />

                <Field
                    component={SmartInput}
                    type='text'
                    icon='phone'
                    placeholder='Phone number'
                    name='phoneNumber'
                    normalize={normalizePhone}
                    validate={[required]}
                />
                <IconButton
                    className='btn--primary-gradient btn--rounded-bottom register-screen__more__btn'
                    Icon={AiOutlineLogin}
                    loading={loading}
                    type='submit'
                >
                    Register
                </IconButton>
            </form>
        </div>
    );
};

export const RegisterFormMore = reduxForm<{}, IProps>({
    form: 'register',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(_RegisterFormMore);
