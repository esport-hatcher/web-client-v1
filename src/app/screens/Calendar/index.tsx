import React, { useState, useCallback, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { useDispatch } from 'react-redux';
import {
    CalendarHeader,
    CalendarDaysList,
    CalendarCellsList,
} from 'app/layouts';
import { HeaderPage } from 'app/components';
import { fetchTeams, fetchEvents } from 'app/actions';

interface IProps {}

export const CalendarPage: React.FC<IProps> = () => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchEvents(currentMonth));
    }, [dispatch, currentMonth]);

    const nextMonth = useCallback(() => {
        setCurrentMonth(currentMonth => addMonths(currentMonth, 1));
    }, [setCurrentMonth]);

    const prevMonth = useCallback(() => {
        setCurrentMonth(currentMonth => subMonths(currentMonth, 1));
    }, [setCurrentMonth]);

    return (
        <main className='calendar'>
            <HeaderPage title='Calendar'>
                <CalendarHeader
                    date={currentMonth}
                    increaseMonth={nextMonth}
                    decreaseMonth={prevMonth}
                />
            </HeaderPage>
            <section className='calendar__content'>
                <div className='calendar__content__container'>
                    <CalendarDaysList currentMonth={currentMonth} />
                    <CalendarCellsList currentMonth={currentMonth} />
                </div>
            </section>
        </main>
    );
};
