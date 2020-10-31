import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch } from 'react-redux';
import { routesPath } from 'app/config';
import { IconButton, Badge, UserAvatar } from 'app/components';
import { fetchEvent, ITeam } from 'app/actions';
import { getTeamById } from 'app/reducers';
import { useSelector, useToggler } from 'app/custom-hooks';

interface IParams {
    eventId?: string;
}

interface IProps {
    opened: boolean | null;
}

export const EventDetails: React.FC<IProps> = ({ opened }) => {
    const { eventId } = useParams<IParams>();
    const [eventTeam, setEventTeam] = useState<ITeam | undefined>(undefined);
    const [addMemberOn, toggleAddMember, setAddMember] = useToggler(false);
    const teams = useSelector(state => state.teams.teams, shallowEqual);
    const event = useSelector(
        state => state.calendar.selectedEvent,
        shallowEqual
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (event && event.TeamId) {
            const team = getTeamById(teams, event.TeamId);
            setEventTeam(team);
        }
    }, [event, setEventTeam, teams]);

    useEffect(() => {
        if (eventId) {
            dispatch(fetchEvent(parseInt(eventId)));
        }
    }, [eventId, dispatch]);

    useEffect(() => {
        if (!opened) {
            setAddMember(false);
        }
    }, [setAddMember, opened]);

    const renderMembers = () => {
        if (event && event.Users) {
            return event.Users.map(member => {
                return (
                    <li
                        className='event-details__members__item'
                        key={member.id}
                    >
                        <UserAvatar
                            avatarUrl={member.avatarUrl}
                            className='event-details__members__item--img'
                        />
                        <span className='important-info important-info--md'>
                            <span className='event-details__members__item--name'>
                                {member.firstName}
                            </span>
                            &nbsp;
                            <span className='event-details__members__item--name'>
                                {member.lastName}
                            </span>
                        </span>
                    </li>
                );
            });
        }
    };

    const renderActionButtons = () => {
        if (addMemberOn) {
            return <div>add member</div>;
        }
        return (
            <button
                className='btn btn--primary--gradient event-details__members__add'
                onClick={toggleAddMember}
            >
                Add member
            </button>
        );
    };

    return (
        <div className='event-details'>
            <Link
                to={routesPath.calendar}
                className='event-details__drawer--close-btn'
            >
                <IconButton
                    Icon={AiOutlineClose}
                    className='btn--icon--secondary'
                />
            </Link>
            {event && (
                <>
                    {eventTeam && (
                        <Badge
                            className='event-details__team'
                            color={eventTeam.TeamUser.color}
                        >
                            {eventTeam.name}
                        </Badge>
                    )}
                    <h1
                        className='title title--md'
                        style={{ textAlign: 'center' }}
                    >
                        {event.title}
                    </h1>
                    <div className='event-details__description event-details__field'>
                        <h3 className='title title--xs'>Description</h3>
                        <div className='event-details__description__body body-text body-text--md'>
                            {event.description}
                        </div>
                    </div>
                    <div className='event-details__field'>
                        <h3 className='title title--xs'>Members</h3>
                        <ul className='event-details__members'>
                            {renderMembers()}
                        </ul>
                        {renderActionButtons()}
                    </div>
                </>
            )}
        </div>
    );
};
