import React from 'react';
import cx from 'classnames';

interface IProps {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    isActive: boolean;
    date: string;
}

export const DatePicker: React.FC<IProps> = React.memo(
    ({ onClick, isActive, date }) => {
        return (
            <div
                className={cx('date-picker', {
                    'date-picker--active': isActive,
                })}
                onClick={onClick}
            >
                {date}
            </div>
        );
    }
);
