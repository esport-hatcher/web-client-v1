import React, { useState, useCallback } from 'react';
import format from 'date-fns/format';
import cx from 'classnames';
import { IconButton, ModalForm } from '../shared';
import { AiOutlinePlus, AiFillEye } from 'react-icons/ai';
import { useToggler } from 'app/custom-hooks';

interface IProps {
    readonly cellDate: Date;
    onClick: (day: Date) => void;
    disabled?: boolean;
    selected?: boolean;
}

export const CalendarCell: React.FC<IProps> = React.memo(
    ({ cellDate, onClick, disabled = false, selected = false }) => {
        const [isFocus, setIsFocus] = useState(false);
        const [showModal, toggleModal] = useToggler(false);

        const ActionButtons = () => {
            if (isFocus && !disabled) {
                return (
                    <div className='calendar-cell__action-buttons'>
                        <IconButton
                            Icon={AiOutlinePlus}
                            className='icon icon--white calendar-cell__action-buttons__button'
                            onClick={toggleModal}
                        />
                        <IconButton
                            Icon={AiFillEye}
                            className='icon icon--white calendar-cell__action-buttons__button'
                        />
                    </div>
                );
            }
            return null;
        };

        return (
            <div
                className={cx('calendar-cell', {
                    'calendar-cell--disabled': disabled,
                })}
                onClick={() => onClick(cellDate)}
                onMouseEnter={useCallback(() => setIsFocus(true), [setIsFocus])}
                onMouseLeave={useCallback(() => setIsFocus(false), [
                    setIsFocus,
                ])}
            >
                {showModal && (
                    <ModalForm
                        title='Create a personal event'
                        // tslint:disable-next-line: no-console
                        onSubmit={() => console.log('test')}
                        onClose={toggleModal}
                    >
                        test
                    </ModalForm>
                )}
                <span className='calendar-cell__date important-info important-info--md'>
                    {format(cellDate, 'd')}
                </span>
                {ActionButtons()}
            </div>
        );
    }
);
