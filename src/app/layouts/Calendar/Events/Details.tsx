import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { routesPath } from 'app/config';

interface IParams {
    eventId?: string;
}

interface IProps {}

export const EventDetails: React.FC<IProps> = (...props) => {
    const { eventId } = useParams<IParams>();

    useEffect(() => {
        // tslint:disable-next-line: no-console
        console.log('params:', eventId);
    }, [eventId]);

    return (
        <div className='event-details'>
            <Link to={routesPath.calendar}>
                <AiOutlineClose />
            </Link>
        </div>
    );
};
