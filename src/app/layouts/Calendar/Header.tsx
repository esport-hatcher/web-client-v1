import React from 'react';
import { format } from 'date-fns';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

interface IProps {
    prevMonth: () => void;
    nextMonth: () => void;
    currentMonth: Date;
}

export const CalendarHeader: React.FC<IProps> = React.memo(
    ({ prevMonth, nextMonth, currentMonth }) => {
        return (
            <div className='calendar__header'>
                <FiChevronLeft
                    className='calendar__header__icon icon icon--white'
                    onClick={prevMonth}
                />
                <span className='calendar__header__currentMonth important-info important-info--md'>
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <FiChevronRight
                    className='calendar__header__icon icon icon--white'
                    onClick={nextMonth}
                />
            </div>
        );
    }
);
