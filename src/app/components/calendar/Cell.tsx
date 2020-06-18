import React from 'react';
import format from 'date-fns/format';

interface IProps {
    readonly cellDate: Date;
    onClick: (day: Date) => void;
    disabled: boolean;
    selected: boolean;
}

export const CalendarCell: React.FC<IProps> = React.memo(
    ({ cellDate, onClick }) => {
        return (
            <div
                className='calendar__content__cell'
                onClick={() => onClick(cellDate)}
            >
                <span className='calendar__content__cell__date'>
                    {format(cellDate, 'd')}
                </span>
            </div>
        );
    }
);
