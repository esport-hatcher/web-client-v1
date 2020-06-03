import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons/lib';

interface IProps {
    name: string;
    Icon: IconType;
    iconColor: string;
    path: string;
}

export const TaskFilterByDate: React.FC<IProps> = React.memo(
    ({ Icon, name, iconColor, path }) => {
        return (
            <NavLink
                // activeClassName='task-filter-by-date--active'
                className='task-filter-by-date'
                to={path}
            >
                <Icon
                    className={`task-filter-by-date__icon icon--${iconColor}`}
                />
                <p>{name}</p>
            </NavLink>
        );
    }
);
