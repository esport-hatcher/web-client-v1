import React, { useCallback, useState, useEffect } from 'react';
import {
    addHours,
    setMinutes,
    endOfDay,
    addMinutes,
    startOfDay,
    getHours,
    setHours,
} from 'date-fns';
import { DatePicker, HourPicker } from '../shared';

export interface IDoubleDate {
    newDateBegin: Date;
    newDateEnd: Date;
}

interface IProps {
    initialDate: Date;
    onChange: (newDates: IDoubleDate) => void;
    cname: String;
}

export const DoubleDateSelector: React.FC<IProps> = React.memo(
    ({ initialDate, onChange, cname }) => {
        const [currentDay, setCurrentDay] = useState<Date>(
            setMinutes(addHours(initialDate, 1), 0)
        );
        const [dateBegin, setDateBegin] = useState<Date>(
            startOfDay(currentDay)
        );
        const [dateEnd, setDateEnd] = useState<Date>(addHours(dateBegin, 1));

        useEffect(() => {
            setDateBegin(dateBegin =>
                setHours(currentDay, getHours(dateBegin))
            );
            setDateEnd(dateEnd => setHours(currentDay, getHours(dateEnd)));
        }, [currentDay, setDateBegin, setDateEnd]);

        useEffect(() => {
            if (dateBegin > dateEnd) {
                setDateEnd(addHours(dateBegin, 1));
            }
        }, [dateBegin, setDateEnd, dateEnd]);

        useEffect(
            () => onChange({ newDateBegin: dateBegin, newDateEnd: dateEnd }),
            [dateBegin, dateEnd, onChange]
        );

        const onDateChange = useCallback(
            (newDate: Date) => setCurrentDay(newDate),
            [setCurrentDay]
        );

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
                    selected={currentDay}
                    onChange={onDateChange}
                    inputClassName={`${cname}__create-event-form__input`}
                    wrapperClassName={`${cname}__create-event-form__input-day`}
                    dateFormat='MMMM d, yyyy'
                />
                <div className={`${cname}__create-event-form__hour-selector`}>
                    <HourPicker
                        selected={dateBegin}
                        onChange={onDateBeginChange}
                        inputClassName={`${cname}__create-event-form__input__hour`}
                        timeCaption='From'
                        wrapperClassName={`${cname}__create-event-form__input-hour`}
                    />
                    <p className='label label--sm'>|</p>
                    <HourPicker
                        selected={dateEnd}
                        onChange={onDateEndChange}
                        minTime={addMinutes(dateBegin, 30)}
                        maxTime={endOfDay(dateBegin)}
                        timeCaption='To'
                        inputClassName={`${cname}__create-event-form__input__hour`}
                        wrapperClassName={`${cname}__create-event-form__input-hour`}
                    />
                </div>
            </>
        );
    }
);
