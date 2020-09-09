import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import { IEvent, ITeam } from 'app/actions';
import { getTeamById } from 'app/reducers/teams';
import { color_blue_light } from 'app/config';

interface IEventItemProps {
    event: IEvent;
    team?: ITeam;
}

interface IProps {
    events: IEvent[];
    teams: ITeam[];
}

const EventListItem: React.FC<IEventItemProps> = React.memo(
    ({ event, team }) => {
        return (
            <li
                className='calendar-cell__event-list__item'
                key={event.id}
                style={{
                    backgroundColor: team
                        ? team.TeamUser.color
                        : color_blue_light,
                }}
            >
                <p className='important-info important-info--sm'>
                    {event.title}
                </p>
                <span className='calendar-cell__event-list__item--hour important-info important-info--sm'>
                    {format(event.dateBegin, 'H:mm')}
                </span>
            </li>
        );
    }
);

export const EventList: React.FC<IProps> = React.memo(({ events, teams }) => {
    const [orderedEvents, setOrderedEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        setOrderedEvents(
            events.sort((a, b) => a.dateBegin.getTime() - b.dateBegin.getTime())
        );
    }, [events, setOrderedEvents]);

    return (
        <ul className='calendar-cell__event-list'>
            {orderedEvents.map(event => {
                return (
                    <EventListItem
                        event={event}
                        team={getTeamById(teams, event.TeamId)}
                    />
                );
            })}
        </ul>
    );
});
