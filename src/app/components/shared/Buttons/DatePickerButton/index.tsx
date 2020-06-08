import React from 'react';
import cx from 'classnames';

interface IProps {
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    isActive: boolean;
    date: string;
    className: string;
    activeClassName: string;
}

export const DatePickerButton: React.FC<IProps> = React.memo(
    ({ onClick, isActive, date, className, activeClassName }) => {
        return (
            <div
                className={cx(className, isActive && activeClassName)}
                onClick={onClick}
            >
                {date}
            </div>
        );
    }
);
