import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineRight } from 'react-icons/ai';
import { FiMail, FiLock } from 'react-icons/fi';
import { RoundButton, FormInput } from 'app/components';
import { OnSubmitFunction } from 'app/actions';

interface IProps {
    onSubmit: OnSubmitFunction;
}

export const RegisterFormBasic: React.FC<IProps> = React.memo(
    ({ onSubmit }) => {
        const { register, handleSubmit } = useForm({
            mode: 'onChange',
        });

        return (
            <div className='register-screen__container'>
                <div className='register-screen__container__title title title--xl'>
                    Register to <br />
                    Esport-Hatcher
                </div>
                <form
                    className='register-screen__basic'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormInput
                        type='email'
                        placeholder='Email'
                        name='email'
                        Icon={FiMail}
                        ref={register}
                    />
                    <FormInput
                        type='text'
                        placeholder='Username'
                        name='username'
                        ref={register}
                    />
                    <FormInput
                        type='password'
                        placeholder='Password'
                        Icon={FiLock}
                        name='password'
                        ref={register}
                    />
                    <FormInput
                        name='passwordConfirm'
                        type='password'
                        placeholder='Confirm Password'
                        Icon={FiLock}
                        ref={register}
                    />
                    <RoundButton
                        type='submit'
                        Icon={AiOutlineRight}
                        className='register-screen__basic__btn btn btn--round btn--secondary-gradient'
                    />
                </form>
            </div>
        );
    }
);
