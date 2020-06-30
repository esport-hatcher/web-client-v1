import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { IFormValues } from 'app/actions';
import { FormInput, BoxHeader } from 'app/components';

interface IProps {
    onSubmit: () => void;
}

export const CreateEventForm: React.FC<IProps> = React.memo(({ onSubmit }) => {
    const { handleSubmit, register } = useForm();

    const _onSubmit = (formValues: IFormValues) => {
        // tslint:disable-next-line: no-console
        console.log('formValues:', formValues);
        onSubmit();
    };

    return (
        <form
            onSubmit={handleSubmit(_onSubmit)}
            className='calendar__create-event-form'
        >
            <BoxHeader
                title='Create a new event'
                className='calendar__create-event-form__header'
            />
            <FormInput
                type='text'
                placeholder='Title'
                name='title'
                ref={register}
                noValidation
                inputClassName='calendar__create-event-form__input'
                className='calendar__create-event-form__input__title'
            />
            <FormInput
                type='text'
                placeholder='Place'
                name='place'
                ref={register}
                noValidation
                Icon={FiMapPin}
                inputClassName='calendar__create-event-form__input'
                className='calendar__create-event-form__input__place'
            />
        </form>
    );
});
