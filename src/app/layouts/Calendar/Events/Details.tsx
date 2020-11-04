import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch } from 'react-redux';
import { routesPath } from 'app/config';
import { IconButton, Badge, UserAvatar, AutoComplete } from 'app/components';
import { fetchEvent, addMemberEvent, ITeam } from 'app/actions';
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
    const [invitedMember, setInvitedMember] = useState<number | undefined>(
        undefined
    );
    const event = useSelector(
        state => state.calendar.selectedEvent,
        shallowEqual
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (event) {
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
            setInvitedMember(undefined);
            setEventTeam(undefined);
        }
    }, [setAddMember, opened]);

    const onSelectedMember = (value: number | undefined) => {
        setInvitedMember(value);
    };

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

    const onAddMember = () => {
        if (eventTeam && invitedMember && eventId) {
            dispatch(
                addMemberEvent(eventTeam.id, invitedMember, parseInt(eventId))
            );
            setInvitedMember(undefined);
            setAddMember(false);
        }
    };

    const mapMembers = () => {
        if (eventTeam && event) {
            /** removes all users already present in the event from the dropdown */
            return eventTeam.Users.filter(
                user => !event.Users.find(eventUser => eventUser.id === user.id)
            ).map(user => ({
                label: `${user.firstName} ${user.lastName}`,
                value: user.id,
            }));
        }
        return [];
    };

    const renderActionButtons = () => {
        if (addMemberOn && eventTeam) {
            const memberItems = mapMembers();
            return (
                <>
                    <AutoComplete
                        items={memberItems}
                        onSelect={onSelectedMember}
                    />
                    {invitedMember && (
                        <IconButton
                            Icon={AiOutlineCheck}
                            className='event-details__members__add--confirm icon--green'
                            onClick={onAddMember}
                        />
                    )}
                </>
            );
        }
        return (
            <button
                className='btn btn--primary--gradient event-details__members__add--btn'
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
                    {eventTeam && (
                        <div className='event-details__field'>
                            <h3 className='title title--xs'>Members</h3>
                            <ul className='event-details__members'>
                                {renderMembers()}
                            </ul>
                            <div className='event-details__members__add'>
                                {renderActionButtons()}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
