import React, { useState, useCallback, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { shallowEqual, useDispatch } from 'react-redux';
import {
    CalendarHeader,
    CalendarDaysList,
    CalendarCellsList,
    CalendarToolbar,
} from 'app/layouts';
import { HeaderPage } from 'app/components';
import { fetchTeams, fetchEvents } from 'app/actions';
import { useSelector } from 'app/custom-hooks';

interface IProps {}

export const CalendarPage: React.FC<IProps> = () => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const teams = useSelector(state => state.teams.teams, shallowEqual);
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

    const onDateChange = useCallback(
        (newDate: Date) => {
            setCurrentMonth(newDate);
        },
        [setCurrentMonth]
    );

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
                    <CalendarToolbar onDateSelectedChange={onDateChange} />
                    <CalendarDaysList currentMonth={currentMonth} />
                    <CalendarCellsList
                        currentMonth={currentMonth}
                        teams={teams}
                    />
                </div>
            </section>
        </main>
    );
};
