import React from 'react';
import format from 'date-fns/format';
import cx from 'classnames';

interface IProps {
    readonly cellDate: Date;
    onClick: (day: Date) => void;
    disabled?: boolean;
    selected?: boolean;
}

export const CalendarCell: React.FC<IProps> = React.memo(
    ({ cellDate, onClick, disabled = false, selected = false }) => {
        return (
            <div
                className={cx('calendar__content__cells__row__item', {
                    'calendar__content__cells__row__item--disabled': disabled,
                })}
                onClick={() => onClick(cellDate)}
            >
                <span className='calendar__content__cells__row__item__date important-info important-info--md'>
                    {format(cellDate, 'd')}
                </span>
            </div>
        );
    }
);
