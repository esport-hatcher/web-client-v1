import React, { useCallback, useEffect, useState } from 'react';
import {
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineDelete,
    AiOutlineDoubleRight,
} from 'react-icons/ai';
import { Link, useHistory, useParams } from 'react-router-dom';
import { shallowEqual, useDispatch } from 'react-redux';
import format from 'date-fns/format';
import { routesPath } from 'app/config';
import {
    IconButton,
    Badge,
    UserAvatar,
    AutoComplete,
    Modal,
    BoxHeader,
} from 'app/components';
import {
    fetchEvent,
    addMemberEvent,
    removeMemberEvent,
    ITeam,
    IUserE,
    IDetailedEvent,
    deleteEvent,
} from 'app/actions';
import { getTeamById } from 'app/reducers';
import { useSelector, useToggler } from 'app/custom-hooks';

interface IParams {
    eventId?: string;
}

interface IProps {
    opened: boolean | null;
}

interface IEventDeleteMemberModalProps
    extends React.ComponentProps<typeof Modal> {
    event: IDetailedEvent;
    user: IUserE;
    onConfirm: () => void;
}

interface IEventDeleteModalProps extends React.ComponentProps<typeof Modal> {
    event: IDetailedEvent;
    onConfirm: () => void;
}

interface ITeamEvent extends Omit<IDetailedEvent, 'TeamId'> {
    TeamId: number;
}

interface IEventMemberProps {
    user: IUserE;
    event: ITeamEvent;
}

const EventDeleteMemberModal: React.FC<IEventDeleteMemberModalProps> = React.memo(
    ({ show, setShow, user, event, onConfirm }) => (
        <Modal show={show} setShow={setShow} className='modal--grid'>
            <BoxHeader
                title={`Are you sure you want to remove ${user.firstName} ${user.lastName} from ${event.title} ?`}
                size='xs'
            />
            <p className='body-text body-text--sm'>
                This user will not be able to see any data related to this
                event.
            </p>
            <div className='modal__action-buttons'>
                <button
                    className='btn btn--primary--gradient'
                    onClick={() => setShow(false)}
                >
                    Cancel
                </button>
                <button
                    className='btn btn--secondary--gradient'
                    onClick={onConfirm}
                >
                    Confirm
                </button>
            </div>
        </Modal>
    )
);

const EventDeleteModal: React.FC<IEventDeleteModalProps> = React.memo(
    ({ show, setShow, event, onConfirm }) => (
        <Modal show={show} setShow={setShow} className='modal--grid'>
            <BoxHeader
                title={`Are you sure you want to delete ${event.title} ?`}
                size='xs'
            />
            <p className='body-text body-text--sm'>
                This event and all data related to it will be completely erased
            </p>
            <div className='modal__action-buttons'>
                <button
                    className='btn btn--primary--gradient'
                    onClick={() => setShow(false)}
                >
                    Cancel
                </button>
                <button
                    className='btn btn--secondary--gradient'
                    onClick={onConfirm}
                >
                    Confirm
                </button>
            </div>
        </Modal>
    )
);

const EventMember: React.FC<IEventMemberProps> = React.memo(
    ({ user, event }) => {
        const [modalDelete, setModalDelete] = useState(false);
        const dispatch = useDispatch();
        const { id, avatarUrl, firstName, lastName } = user;
        const toggleModalOn = useCallback(() => setModalDelete(true), [
            setModalDelete,
        ]);

        const onDelete = useCallback(() => {
            setModalDelete(false);
            dispatch(removeMemberEvent(event.TeamId, user.id, event.id));
        }, [dispatch, event.TeamId, user.id, event.id]);

        return (
            <li className='event-details__members__item' key={id}>
                <EventDeleteMemberModal
                    show={modalDelete}
                    setShow={setModalDelete}
                    onConfirm={onDelete}
                    user={user}
                    event={event}
                />
                <UserAvatar
                    avatarUrl={avatarUrl}
                    className='event-details__members__item--img'
                />
                <span className='important-info important-info--md'>
                    <span className='event-details__members__item--name'>
                        {firstName}
                    </span>
                    &nbsp;
                    <span className='event-details__members__item--name'>
                        {lastName}
                    </span>
                </span>
                <IconButton
                    Icon={AiOutlineDelete}
                    className='event-details__members__item--delete icon--red'
                    onClick={toggleModalOn}
                />
            </li>
        );
    }
);

export const EventDetails: React.FC<IProps> = React.memo(({ opened }) => {
    const { eventId } = useParams<IParams>();
    const [eventTeam, setEventTeam] = useState<ITeam | undefined>(undefined);
    const [addMemberOn, toggleAddMember, setAddMember] = useToggler(false);
    const [eventDeleteMode, setEventDeleteMode] = useState(false);
    const teams = useSelector(state => state.teams.teams, shallowEqual);
    const [invitedMember, setInvitedMember] = useState<number | undefined>(
        undefined
    );
    const history = useHistory();
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

    const onSelectedMember = useCallback(
        (value: number | undefined) => {
            setInvitedMember(value);
        },
        [setInvitedMember]
    );

    const renderMembers = () => {
        if (event && event.Users && event.TeamId) {
            return event.Users.map(member => (
                <EventMember user={member} event={event as ITeamEvent} />
            ));
        }
    };

    const onAddMember = useCallback(() => {
        if (eventTeam && invitedMember && eventId) {
            dispatch(
                addMemberEvent(eventTeam.id, invitedMember, parseInt(eventId))
            );
            setInvitedMember(undefined);
            setAddMember(false);
        }
    }, [
        eventTeam,
        invitedMember,
        eventId,
        addMemberEvent,
        dispatch,
        setInvitedMember,
        setAddMember,
    ]);

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

    const toggleDeleteModeOn = useCallback(() => setEventDeleteMode(true), [
        setEventDeleteMode,
    ]);

    const onDeleteConfirm = useCallback(() => {
        if (event) {
            dispatch(deleteEvent(event.id, event.TeamId));
            setEventDeleteMode(false);
            history.goBack();
        }
    }, [dispatch, event, setEventDeleteMode]);

    const renderAddMemberButton = () => {
        if (addMemberOn && eventTeam) {
            const memberItems = mapMembers();
            return (
                <div className='event-details__action-buttons--add'>
                    <AutoComplete
                        items={memberItems}
                        onSelect={onSelectedMember}
                    />
                    {invitedMember && (
                        <IconButton
                            Icon={AiOutlineCheck}
                            className='event-details__action-buttons--add--confirm icon--green'
                            onClick={onAddMember}
                        />
                    )}
                </div>
            );
        }
        return (
            <button
                className='btn btn--secondary--gradient event-details__action-buttons--add--btn event-details__action-buttons--it'
                onClick={toggleAddMember}
            >
                Add member
            </button>
        );
    };

    const renderActionButtons = () => {
        return (
            <>
                {eventTeam && renderAddMemberButton()}
                <button
                    className='btn btn--primary--gradient event-details__action-buttons--delete event-details__action-buttons--it'
                    onClick={toggleDeleteModeOn}
                >
                    Delete event
                </button>
            </>
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
                    <EventDeleteModal
                        show={eventDeleteMode}
                        setShow={setEventDeleteMode}
                        onConfirm={onDeleteConfirm}
                        event={event}
                    />
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
                    <div className='event-details__dates event-details__field important-info important-info--md'>
                        <p className='event-details__dates--begin'>
                            <span className='event-details__dates--item'>
                                {format(
                                    event.dateBegin,
                                    'dd MMMM yyyy (HH:mm)'
                                )}
                            </span>
                        </p>
                        <AiOutlineDoubleRight className='event-details__dates--separator' />
                        <p className='event-details__dates--end'>
                            <span className='event-details__dates--item'>
                                {format(event.dateEnd, 'dd MMMM yyyy (HH:mm)')}
                            </span>
                        </p>
                    </div>
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
                        </div>
                    )}
                    <div className='event-details__action-buttons'>
                        {renderActionButtons()}
                    </div>
                </>
            )}
        </div>
    );
});
