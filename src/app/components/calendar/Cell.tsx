import React, { useState, useCallback } from 'react';
import format from 'date-fns/format';
import cx from 'classnames';
import { IconButton } from '../shared';
import { AiOutlinePlus, AiFillEye } from 'react-icons/ai';

interface IProps {
    readonly cellDate: Date;
    onClick: (day: Date) => void;
    disabled?: boolean;
    selected?: boolean;
}

export const CalendarCell: React.FC<IProps> = React.memo(
    ({ cellDate, onClick, disabled = false, selected = false }) => {
        const [isFocus, setIsFocus] = useState(false);

        const ActionButtons = () => {
            if (isFocus) {
                return (
                    <div className='calendar__content__cells__row__item__action-buttons'>
                        <IconButton
                            Icon={AiOutlinePlus}
                            className='icon icon--white calendar__content__cells__row__item__action-buttons__button'
                            // tslint:disable: no-console
                            onClick={() => console.log('plus')}
                        />
                        <IconButton
                            Icon={AiFillEye}
                            className='icon icon--white calendar__content__cells__row__item__action-buttons__button'
                            onClick={() => console.log('details')}
                        />
                    </div>
                );
            }
            return null;
        };

        return (
            <div
                className={cx('calendar__content__cells__row__item', {
                    'calendar__content__cells__row__item--disabled': disabled,
                })}
                onClick={() => onClick(cellDate)}
                onMouseEnter={useCallback(() => setIsFocus(true), [setIsFocus])}
                onMouseLeave={useCallback(() => setIsFocus(false), [
                    setIsFocus,
                ])}
            >
                <span className='calendar__content__cells__row__item__date important-info important-info--md'>
                    {format(cellDate, 'd')}
                </span>
                {ActionButtons()}
            </div>
        );
    }
);
