import React from 'react';
import { ITeam } from 'app/actions';
import { DatePicker } from 'app/components';
import { TeamFilters } from './TeamFilters';

interface IProps {
    onDateSelectedChange: (newDate: Date) => void;
    onFiltersChange: (teamIds: number[]) => void;
    teams: ITeam[];
}

export const CalendarToolbar: React.FC<IProps> = React.memo(
    ({ onDateSelectedChange, onFiltersChange, teams }) => {
        return (
            <menu className='calendar__content__toolbar'>
                <DatePicker
                    inline
                    onChange={onDateSelectedChange}
                    calendarClassName='calendar__content__toolbar--datepicker'
                />
                <hr className='calendar__content__toolbar--delimiter' />
                <TeamFilters teams={teams} onChange={onFiltersChange} />
            </menu>
        );
    }
);
