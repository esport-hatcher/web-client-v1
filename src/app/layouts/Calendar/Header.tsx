import React from 'react';
import { format } from 'date-fns';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

interface IProps {
    decreaseMonth: () => void;
    increaseMonth: () => void;
    className?: string;
    date: Date;
}

export const CalendarHeader: React.FC<IProps> = React.memo(
    ({ decreaseMonth, increaseMonth, date, className }) => {
        return (
            <div className={`calendar__header ${className}`}>
                <FiChevronLeft
                    className='calendar__header__icon icon icon--white'
                    onClick={decreaseMonth}
                />
                <span className='calendar__header__currentMonth important-info important-info--md'>
                    {format(date, 'MMMM yyyy')}
                </span>
                <FiChevronRight
                    className='calendar__header__icon icon icon--white'
                    onClick={increaseMonth}
                />
            </div>
        );
    }
);
