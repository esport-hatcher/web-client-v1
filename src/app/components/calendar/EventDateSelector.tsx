import React, { useCallback, useState, useEffect } from 'react';
import {
    addHours,
    setMinutes,
    endOfDay,
    addMinutes,
    startOfDay,
} from 'date-fns';
import { DatePicker, HourPicker } from '../shared';

interface IProps {
    initialDate: Date;
}

export const EventDateSelector: React.FC<IProps> = React.memo(
    ({ initialDate }) => {
        const [day, setDay] = useState<Date>(
            setMinutes(addHours(initialDate, 1), 0)
        );
        const [dateBegin, setDateBegin] = useState<Date>(startOfDay(day));
        const [dateEnd, setDateEnd] = useState<Date>(addHours(dateBegin, 1));

        useEffect(() => setDateEnd(addHours(dateBegin, 1)), [
            dateBegin,
            setDateEnd,
        ]);

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
                    wrapperClassName='calendar__create-event-form__input-day'
                    dateFormat='MMMM d, yyyy'
                />
                <div className='calendar__create-event-form__hour-selector'>
                    <HourPicker
                        selected={dateBegin}
                        onChange={onDateBeginChange}
                        inputClassName='calendar__create-event-form__input'
                        timeCaption='From'
                        wrapperClassName='calendar__create-event-form__input-hour'
                    />
                    <p className='label label--sm'>|</p>
                    <HourPicker
                        selected={dateEnd}
                        onChange={onDateEndChange}
                        minTime={addMinutes(dateBegin, 30)}
                        maxTime={endOfDay(dateBegin)}
                        timeCaption='To'
                        inputClassName='calendar__create-event-form__input'
                        wrapperClassName='calendar__create-event-form__input-hour'
                    />
                </div>
            </>
        );
    }
);
