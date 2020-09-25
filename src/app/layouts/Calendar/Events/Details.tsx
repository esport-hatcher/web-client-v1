import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { routesPath } from 'app/config';

interface IProps {}

export const EventDetails: React.FC<IProps> = () => {
    return (
        <div className='event-details'>
            <Link to={routesPath.calendar}>
                <AiOutlineClose />
            </Link>
        </div>
    );
};
