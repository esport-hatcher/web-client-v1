import React from 'react';
import { startOfWeek, addDays, format } from 'date-fns';

interface IProps {
    currentMonth: Date;
}

export const CalendarDaysList: React.FC<IProps> = React.memo(
    ({ currentMonth }) => {
        const renderDays = (): JSX.Element[] => {
            const days = [];

            const startDate = startOfWeek(currentMonth);
            for (let i = 0; i < 7; i++) {
                days.push(
                    <div
                        className='calendar__content__days placeholder placeholder--md'
                        key={i}
                    >
                        {format(addDays(startDate, i), 'eeee')}
                    </div>
                );
            }
            return days;
        };

        return <>{renderDays()}</>;
    }
);
