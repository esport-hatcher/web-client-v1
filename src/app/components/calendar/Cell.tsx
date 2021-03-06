import React, { useState, useCallback } from 'react';
import { format, isPast, addDays } from 'date-fns';
import cx from 'classnames';
import { AiOutlinePlus, AiFillEye } from 'react-icons/ai';
import { IconButton, Modal, SlideDrawer } from '../shared';
import { CreateEventForm } from 'app/layouts';
import { IEvent, ITeam } from 'app/actions';
import { EventList } from './EventList';

interface IProps {
    readonly cellDate: Date;
    events: IEvent[];
    teams: ITeam[];
    disabled?: boolean;
}

export const CalendarCell: React.FC<IProps> = React.memo(
    ({ cellDate, events, teams, disabled = false }) => {
        const [isFocus, setIsFocus] = useState(false);
        const [showModal, setShowModal] = useState(false);
        const [showDetails, setShowDetails] = useState(false);

        const setModalOn = useCallback(() => {
            setShowModal(true);
            setTimeout(() => setIsFocus(false), 200);
        }, [setShowModal, setIsFocus]);

        const toggleDetailsOn = useCallback(() => {
            setShowDetails(true);
        }, [setShowDetails]);

        const toggleDetailsOff = useCallback(() => {
            setShowDetails(false);
        }, [setShowDetails]);

        const ActionButtons = () => {
            if (isFocus && !disabled) {
                return (
                    <div className='calendar-cell__action-buttons'>
                        <IconButton
                            disabled={isPast(addDays(cellDate, 1))}
                            Icon={AiOutlinePlus}
                            className='btn--icon--secondary'
                            onClick={setModalOn}
                        />
                        <IconButton
                            Icon={AiFillEye}
                            className='btn--icon--secondary'
                            onClick={toggleDetailsOn}
                        />
                    </div>
                );
            }
            return null;
        };

        const onFormSubmit = useCallback(() => setShowModal(false), [
            setShowModal,
        ]);

        return (
            <div
                className={cx('calendar-cell', {
                    'calendar-cell--disabled': disabled,
                })}
                onMouseEnter={useCallback(() => setIsFocus(true), [setIsFocus])}
                onMouseLeave={useCallback(() => setIsFocus(false), [
                    setIsFocus,
                ])}
            >
                <span className='calendar-cell__date important-info important-info--md'>
                    {format(cellDate, 'd')}
                </span>
                <EventList events={events} teams={teams} />
                {ActionButtons()}
                <Modal
                    setShow={setShowModal}
                    show={showModal}
                    className='calendar__create-event-form-modal'
                >
                    <CreateEventForm
                        onSubmit={onFormSubmit}
                        initialDate={cellDate}
                    />
                </Modal>
                <SlideDrawer isOpen={showDetails} onClose={toggleDetailsOff} />
            </div>
        );
    }
);
