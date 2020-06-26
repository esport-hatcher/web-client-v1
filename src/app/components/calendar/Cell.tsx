import React, { useState, useCallback } from 'react';
import format from 'date-fns/format';
import cx from 'classnames';
import { IconButton, Modal } from '../shared';
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
        const [showModal, setShowModal] = useState(false);

        const setModalOn = useCallback(() => setShowModal(true), [
            setShowModal,
        ]);

        const ActionButtons = () => {
            if (isFocus && !disabled) {
                return (
                    <div className='calendar-cell__action-buttons'>
                        <IconButton
                            Icon={AiOutlinePlus}
                            className='icon icon--white calendar-cell__action-buttons__button'
                            onClick={setModalOn}
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
                <span className='calendar-cell__date important-info important-info--md'>
                    {format(cellDate, 'd')}
                </span>
                {ActionButtons()}
                <Modal
                    title='Create a new event'
                    setShow={setShowModal}
                    show={showModal}
                >
                    test
                </Modal>
            </div>
        );
    }
);
