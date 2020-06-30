import React, { useState, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarHeader, CalendarDaysList } from 'app/layouts';
import { HeaderPage } from 'app/components';
import { CalendarCellsList } from 'app/layouts/Calendar/CellsList';

interface IProps {}

export const CalendarPage: React.FC<IProps> = () => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate] = useState<Date>(new Date());

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
                    <CalendarCellsList
                        currentMonth={currentMonth}
                        selectedDate={selectedDate}
                    />
                </div>
            </section>
        </main>
    );
};
