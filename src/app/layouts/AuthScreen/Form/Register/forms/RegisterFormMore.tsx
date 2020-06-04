import React, { useCallback, useState } from 'react';
import { AiOutlineLeft, AiOutlineLogin } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { FormInput, IconButton, RoundButton } from 'app/components';
import { IFormValues } from 'app/actions';
import { RegisterStage } from '../RegisterForm';

interface IProps {
    goTo: Function;
    onSubmit: (formValues: IFormValues) => Promise<void>;
}

export const RegisterFormMore: React.FC<IProps> = ({ goTo, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm({
        mode: 'onChange',
    });
    const onGoBack = useCallback(() => {
        goTo(RegisterStage.basic);
    }, [goTo]);

    const _onSubmit = useCallback(
        async (formValues: IFormValues) => {
            try {
                setLoading(true);
                await onSubmit(formValues);
            } catch {
                setLoading(false);
            }
        },
        [setLoading, onSubmit]
    );

    return (
        <div className='register-screen__container'>
            <div className='register-screen__container__title title title--xl'>
                Tell us more about you
            </div>

            <form
                className='register-screen__more'
                onSubmit={handleSubmit(_onSubmit)}
            >
                <RoundButton
                    type='button'
                    onClick={onGoBack}
                    Icon={AiOutlineLeft}
                    className='register-screen__more__btn-back btn btn--round btn--secondary-gradient'
                />
                <FormInput
                    type='text'
                    placeholder='First name'
                    name='firstName'
                    ref={register}
                />
                <FormInput
                    type='text'
                    placeholder='Last name'
                    name='lastName'
                    ref={register}
                />
                <FormInput
                    type='text'
                    placeholder='City'
                    name='city'
                    ref={register}
                />
                <FormInput
                    type='text'
                    placeholder='Country'
                    name='country'
                    ref={register}
                />

                <FormInput
                    type='text'
                    placeholder='Phone number'
                    name='phoneNumber'
                    ref={register}
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
