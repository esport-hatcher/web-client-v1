import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { IFormValues } from 'app/actions';
import {
    FormInput,
    BoxHeader,
    EventDateSelector,
    Dropdown,
} from 'app/components';
import { TextArea } from 'app/components/shared/Inputs/TextArea';

interface IProps {
    onSubmit: () => void;
    initialDate: Date;
}

const options = [
    { value: 'personal', label: 'Personal' },
    { value: 'fnatic', label: 'Fnatic' },
    { value: 'gw', label: 'Gameward' },
    { value: 'peonal', label: 'Pernal' },
    { value: 'fntic', label: 'Fntic' },
    { value: 'gwa', label: 'Gamewaaezrd' },
    { value: 'perezaezasonal', label: 'Pzeenal' },
    { value: 'fnaaezaetic', label: 'Fnaazeazetic' },
    { value: 'gzaezaew', label: 'Gamewzaeaeard' },
];

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
                >
                    <Dropdown
                        options={options}
                        name='entity'
                        defaultValue={options[0]}
                        className='calendar__create-event-form__header-entity'
                        separatorOnFocus
                    />
                </BoxHeader>
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
                        className='calendar__create-event-form__input-title'
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
                        className='calendar__create-event-form__input-place'
                        noLabelOnFocus
                    />
                    <EventDateSelector initialDate={initialDate} />
                    <TextArea
                        name='description'
                        ref={register}
                        className='calendar__create-event-form__input calendar__create-event-form__input-description'
                        placeholder='Description...'
                    />
                </form>
            </div>
        );
    }
);
