import React, { useState, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarHeader, CalendarDaysList } from 'app/layouts';
import { HeaderPage } from 'app/components';
import { CalendarCellsList } from 'app/layouts/Calendar/CellsList';

interface IProps {}

export const CalendarPage: React.FC<IProps> = () => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const nextMonth = useCallback(() => {
        setCurrentMonth(currentMonth => addMonths(currentMonth, 1));
    }, [setCurrentMonth]);

    const prevMonth = useCallback(() => {
        setCurrentMonth(currentMonth => subMonths(currentMonth, 1));
    }, [setCurrentMonth]);

    const onCellClick = useCallback(
        (day: Date) => {
            setSelectedDate(day);
        },
        [setSelectedDate]
    );

    return (
        <main className='calendar'>
            <HeaderPage title='Calendar'>
                <CalendarHeader
                    currentMonth={currentMonth}
                    nextMonth={nextMonth}
                    prevMonth={prevMonth}
                />
            </HeaderPage>
            <section className='calendar__content'>
                <CalendarDaysList currentMonth={currentMonth} />
                <CalendarCellsList
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onCellClick={onCellClick}
                />
            </section>
        </main>
    );
};
