import React from 'react';
import { IconType } from 'react-icons/lib';
import cx from 'classnames';

interface IProps {
    name: string;
    Icon: IconType;
    iconColor: string;
    active?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const TaskFilterByDate: React.FC<IProps> = React.memo(
    ({ Icon, name, iconColor, active, onClick }) => {
        return (
            <button
                className={cx('task-filter-by-date', {
                    'task-filter-by-date--active': active,
                })}
                onClick={onClick}
            >
                <Icon
                    className={`task-filter-by-date__icon icon--${iconColor}`}
                />
                <p>{name}</p>
            </button>
        );
    }
);
