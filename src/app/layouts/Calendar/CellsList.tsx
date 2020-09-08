import React from 'react';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    addDays,
} from 'date-fns';
import { CalendarCell } from 'app/components';

interface IProps {
    currentMonth: Date;
}

export const CalendarCellsList: React.FC<IProps> = ({ currentMonth }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(
                <CalendarCell
                    cellDate={day}
                    key={day.toString()}
                    disabled={!isSameMonth(day, monthStart)}
                />
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className='calendar__content__cells__row' key={day.toString()}>
                {days}
            </div>
        );
        days = [];
    }
    return <section className='calendar__content__cells'>{rows}</section>;
};
