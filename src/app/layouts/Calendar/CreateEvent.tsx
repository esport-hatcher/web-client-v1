import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { shallowEqual, useDispatch } from 'react-redux';
import { OptionsType, ValueType } from 'react-select';
import unionBy from 'lodash/unionBy';
import {
    FormInput,
    BoxHeader,
    DoubleDateSelector,
    Dropdown,
    TextArea,
    IDoubleDate,
    IOption,
} from 'app/components';
import { useSelector } from 'app/custom-hooks';
import { AsyncDispatch, IFormValues, createEvent } from 'app/actions';

interface IProps {
    onSubmit: () => void;
    initialDate: Date;
}

export const CreateEventForm: React.FC<IProps> = React.memo(
    ({ onSubmit, initialDate }) => {
        const { handleSubmit, register } = useForm();
        const [options, setOptions] = useState<OptionsType<IOption>>([
            { value: '0', label: 'Personal' },
        ]);
        const rawTeams = useSelector(state => state.teams.teams, shallowEqual);
        const [selectedOption, setSelectedOption] = useState<number>(0); // set default option to personal
        const [dateBegin, setDateBegin] = useState<Date>(new Date());
        const [dateEnd, setDateEnd] = useState<Date>(new Date());
        const dispatch = useDispatch() as AsyncDispatch;

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

        const _onSubmit = async (tempFormValues: IFormValues) => {
            // tslint:disable-next-line: no-console
            const formValues = { ...tempFormValues, dateBegin, dateEnd };
            await dispatch(createEvent(formValues, selectedOption));
            onSubmit();
        };

        const onDateChange = useCallback(
            ({ newDateBegin, newDateEnd }: IDoubleDate) => {
                setDateBegin(newDateBegin);
                setDateEnd(newDateEnd);
            },
            [setDateBegin, setDateEnd]
        );

        const onOptionChange = useCallback(
            (value: ValueType<IOption>) => {
                if (value) {
                    setSelectedOption(parseInt((value as IOption).value));
                }
            },
            [setSelectedOption]
        );

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
                        onChange={onOptionChange}
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
                    <DoubleDateSelector
                        onChange={onDateChange}
                        initialDate={initialDate}
                    />
                    <TextArea
                        name='description'
                        ref={register}
                        className='calendar__create-event-form__input calendar__create-event-form__input-description'
                        placeholder='Description...'
                    />
                    <button
                        type='submit'
                        className='btn btn--primary calendar__create-event-form__submit'
                    >
                        Create
                    </button>
                </form>
            </div>
        );
    }
);
