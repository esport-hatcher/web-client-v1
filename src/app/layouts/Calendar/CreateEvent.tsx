import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { IFormValues } from 'app/actions';
import { shallowEqual, useDispatch } from 'react-redux';
import { OptionsType } from 'react-select';
import unionBy from 'lodash/unionBy';
import {
    FormInput,
    BoxHeader,
    EventDateSelector,
    Dropdown,
    TextArea,
} from 'app/components';
import { useSelector } from 'app/custom-hooks';

interface IProps {
    onSubmit: () => void;
    initialDate: Date;
}

export const CreateEventForm: React.FC<IProps> = React.memo(
    ({ onSubmit, initialDate }) => {
        const { handleSubmit, register } = useForm();
        const [options, setOptions] = useState<
            OptionsType<{
                label: string;
                value: string;
            }>
        >([{ value: '0', label: 'Personal' }]);
        const rawTeams = useSelector(state => state.teams, shallowEqual);

        useEffect(() => {
            setOptions(currentOptions =>
                unionBy(
                    currentOptions,
                    rawTeams.map(rawTeam => ({
                        value: rawTeam.id.toString(),
                        label: rawTeam.name,
                    })),
                    'value'
                )
            );
        }, [rawTeams]);

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
