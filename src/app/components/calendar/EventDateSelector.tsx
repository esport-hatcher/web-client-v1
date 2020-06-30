import React, { useCallback, useState } from 'react';
import { addHours, setMinutes, endOfDay } from 'date-fns';
import { DatePicker, HourPicker } from '../shared';

interface IProps {
    initialDate: Date;
}

export const EventDateSelector: React.FC<IProps> = React.memo(
    ({ initialDate }) => {
        const [day, setDay] = useState<Date>(
            setMinutes(addHours(initialDate, 1), 0)
        );
        const [dateBegin, setDateBegin] = useState<Date>(day);
        const [dateEnd, setDateEnd] = useState<Date>(addHours(day, 1));

        const onDateChange = useCallback((newDate: Date) => setDay(newDate), [
            setDay,
        ]);

        const onDateBeginChange = useCallback(
            (newDate: Date) => setDateBegin(newDate),
            [setDateBegin]
        );

        const onDateEndChange = useCallback(
            (newDate: Date) => setDateEnd(newDate),
            [setDateEnd]
        );

        return (
            <>
                <DatePicker
                    selected={day}
                    onChange={onDateChange}
                    inputClassName='calendar__create-event-form__input'
                    wrapperClassName='calendar__create-event-form__input__day'
                    dateFormat='MMMM d, yyyy'
                />
                <div className='calendar__create-event-form__hour-selector'>
                    <HourPicker
                        selected={dateBegin}
                        onChange={onDateBeginChange}
                        inputClassName='calendar__create-event-form__input'
                        wrapperClassName='calendar__create-event-form__input__hour'
                    />
                    <p className='label label--sm'>|</p>
                    <HourPicker
                        selected={dateEnd}
                        onChange={onDateEndChange}
                        minTime={dateBegin}
                        maxTime={endOfDay(dateBegin)}
                        inputClassName='calendar__create-event-form__input'
                        wrapperClassName='calendar__create-event-form__input__hour'
                    />
                </div>
            </>
        );
    }
);
