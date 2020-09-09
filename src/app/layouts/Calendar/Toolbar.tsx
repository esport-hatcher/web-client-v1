import { DatePicker } from 'app/components';
import React from 'react';

interface IProps {
    onDateSelectedChange: (newDate: Date) => void;
}

export const CalendarToolbar: React.FC<IProps> = React.memo(
    ({ onDateSelectedChange }) => {
        return (
            <menu className='calendar__content__toolbar'>
                <DatePicker
                    inline
                    onChange={onDateSelectedChange}
                    calendarClassName='calendar__content__toolbar--datepicker'
                />
                <hr className='calendar__content__toolbar--delimiter' />
            </menu>
        );
    }
);
