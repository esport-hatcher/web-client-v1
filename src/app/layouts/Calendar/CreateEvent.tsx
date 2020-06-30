import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { IFormValues } from 'app/actions';
import {
    FormInput,
    BoxHeader,
    DatePicker,
    EventDateSelector,
} from 'app/components';

interface IProps {
    onSubmit: () => void;
    initialDate: Date;
}

export const CreateEventForm: React.FC<IProps> = React.memo(
    ({ onSubmit, initialDate }) => {
        const { handleSubmit, register } = useForm();

        const _onSubmit = (formValues: IFormValues) => {
            // tslint:disable-next-line: no-console
            console.log('formValues:', formValues);
            onSubmit();
        };

        return (
            <div className='calendar__create-event-form'>
                <BoxHeader
                    title='Create a new event'
                    className='calendar__create-event-form__header'
                />
                <form
                    className='calendar__create-event-form__form'
                    onSubmit={handleSubmit(_onSubmit)}
                >
                    <FormInput
                        type='text'
                        placeholder='Title'
                        name='title'
                        ref={register}
                        noValidation
                        inputClassName='calendar__create-event-form__input'
                        className='calendar__create-event-form__input__title'
                        noLabelOnFocus
                        autoFocus
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
                        noLabelOnFocus
                    />
                    <EventDateSelector initialDate={initialDate} />
                </form>
            </div>
        );
    }
);
