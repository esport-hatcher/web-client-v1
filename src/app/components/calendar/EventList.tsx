import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <Link
                to={`/calendar/events/${event.id}/details`}
                className='event-list__item'
                style={{
                    backgroundColor: team
                        ? team.TeamUser.color
                        : color_blue_light,
                }}
            >
                <p className='event-list__item--title important-info important-info--sm'>
                    {event.title}
                </p>
                <span className='event-list__item--hour important-info important-info--sm'>
                    {format(event.dateBegin, 'H:mm')}
                </span>
            </Link>
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
        <ul className='event-list'>
            {orderedEvents.map(event => {
                return (
                    <EventListItem
                        key={event.id}
                        event={event}
                        team={getTeamById(teams, event.TeamId)}
                    />
                );
            })}
        </ul>
    );
});
