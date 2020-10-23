import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { routesPath } from 'app/config';
import { IconButton } from 'app/components';
import { shallowEqual, useDispatch } from 'react-redux';
import { fetchEvent } from 'app/actions';
import { useSelector } from 'app/custom-hooks';

interface IParams {
    eventId?: string;
}

interface IProps {}

export const EventDetails: React.FC<IProps> = (...props) => {
    const { eventId } = useParams<IParams>();
    const event = useSelector(
        state => state.calendar.selectedEvent,
        shallowEqual
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (eventId) {
            dispatch(fetchEvent(parseInt(eventId)));
        }
    }, [eventId, dispatch]);

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
                    <h1
                        className='title title--md'
                        style={{ textAlign: 'center' }}
                    >
                        {event.title}
                    </h1>
                    <div className='event-details__description body-text body-text--md'>
                        {event.description}
                    </div>
                </>
            )}
        </div>
    );
};
