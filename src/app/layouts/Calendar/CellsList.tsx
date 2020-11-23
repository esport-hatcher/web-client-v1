import React from 'react';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    addDays,
} from 'date-fns';
import { shallowEqual } from 'react-redux';
import { CalendarCell } from 'app/components';
import { useSelector } from 'app/custom-hooks';
import { getEventsByDay, getEventsForTeams } from 'app/reducers';
import { ITeam } from 'app/actions';

interface IProps {
    currentMonth: Date;
    teams: ITeam[];
    // ids of the teams to fetch event from
    filters: number[];
}

export const CalendarCellsList: React.FC<IProps> = ({
    currentMonth,
    teams,
    filters,
}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const events = getEventsForTeams(
        useSelector(state => state.calendar.events, shallowEqual),
        filters
    );

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(
                <CalendarCell
                    teams={teams}
                    events={getEventsByDay(events, day)}
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
