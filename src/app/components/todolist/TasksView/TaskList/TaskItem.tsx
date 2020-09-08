import React, { useState, useCallback } from 'react';
import { FiCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { ITask, deleteTask, patchTask } from 'app/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { ModalInput } from 'app/components/shared/Modals/Input';
import { DatePickerButton, MiniCalendar } from 'app/components';
import { useToggler, useInput } from 'app/custom-hooks';
import { sendToast } from 'app/shared';
import cx from 'classnames';

interface IProps {
    task: ITask;
    late: boolean;
}

export const TaskItem: React.FC<IProps> = React.memo(({ task, late }) => {
    /* TASK CONST EDIT */
    const [inputMode, setInputMode] = useToggler(false);
    const [inputValue, setInputValue] = useInput(task.title);

    /* TASK CONST CALENDAR */
    const [showMiniCalendar, setShowMiniCalendar] = useToggler(false);
    const [date, setDate] = useState(moment(task.dateEnd).format('Y/M/D'));

    /* TASK CONST COMMENT */
    const [showModal, toggleModal] = useToggler(false);

    const dispatch = useDispatch();

    /* TASK FUNCTION DISPLAY */
    const displayValue = () => {
        if (task.title === inputValue) {
            return task.title;
        }
        return inputValue;
    };

    /* TASK FUNCTIONS EDIT */
    const onInputChange = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            dispatch(patchTask(task, { [e.target.name]: e.target.value }));
        },
        [task, dispatch]
    );

    const onLoseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onInputChange(e);
    };

    const onDateChange = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(patchTask(task, { dateEnd: date }));
            sendToast({
                title: 'Task Edited',
                content: 'You successfully edited the task !',
                type: 'success',
            });
            setInputMode();
        },
        [task, date, setInputMode, dispatch]
    );

    /* TASK FUNCTION COMMENT */
    const onConfirmModal = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(patchTask(task, { [e.target.name]: e.target.value }));
            sendToast({
                title: 'Task Edited',
                content: 'You successfully edited the comment !',
                type: 'success',
            });
        },
        [task, dispatch]
    );

    /* TASK FUNCTION COMPLETE */
    const onCompleteTask = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(patchTask(task, { completed: true }));
            sendToast({
                title: 'Task Completed',
                content: 'You completed the task !',
                type: 'success',
            });
        },
        [task, dispatch]
    );

    /* TASK FUNCTION DELETE */
    const handleDelete = useCallback(() => {
        dispatch(deleteTask(task));
    }, [task, dispatch]);

    const displayContent = () => {
        if (inputMode) {
            return (
                <div className='task-list-item__inputmode'>
                    <div>
                        <input
                            className='task-list-item__inputmode__input'
                            value={inputValue}
                            onChange={setInputValue}
                            autoFocus
                            name='title'
                            onBlur={onLoseFocus}
                        />
                        <button
                            className='task-list-item__inputmode__button'
                            onClick={onDateChange}
                        >
                            <BsPencil className='task-list-item__inputmode__button__icon' />
                        </button>
                        <div className='task-list-item__inputmode__calendar'>
                            <div className='create-task'>
                                <DatePickerButton
                                    onClick={setShowMiniCalendar}
                                    isActive={showMiniCalendar}
                                    date={date}
                                    className={
                                        'task-list-item__inputmode__calendar__date-picker'
                                    }
                                    activeClassName={
                                        'task-list-item__inputmode__calendar__date-picker--active'
                                    }
                                />
                                {showMiniCalendar && (
                                    <MiniCalendar
                                        setShowMiniCalendar={
                                            setShowMiniCalendar
                                        }
                                        setDate={setDate}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <p className='task-list-item__title'>{displayValue()}</p>
                <div className='task-list-item__dateEnd'>
                    {moment(task.dateEnd).format('YYYY-MM-DD')}
                </div>
            </div>
        );
    };

    return (
        <div className='task-list-item'>
            <div
                className={cx('task-list-item__state', {
                    'task-list-item__state--late': late,
                })}
            >
                <FiCircle className='task-list-item__state__icon' />
            </div>

            {/* TASK TITLE */}
            <div className='task-list-item__content'>
                <div className='task-list-item__title'>{displayContent()}</div>
            </div>

            {/* TASK BUTTON EDIT/COMMENT */}
            <button className='task-list-item__edit' onClick={setInputMode}>
                Edit
            </button>
            <button className='task-list-item__comment' onClick={toggleModal}>
                Comment
            </button>
            {showModal && (
                <ModalInput
                    task={task}
                    onClose={toggleModal}
                    onConfirm={onConfirmModal}
                />
            )}

            {/* TASK BUTTON COMPLETE/DELETE */}
            <button
                onClick={onCompleteTask}
                className='task-list-item__validate'
            >
                <FaCheck className='task-list-item__icon' />
            </button>
            <button onClick={handleDelete} className='task-list-item__delete'>
                <RiDeleteBinLine className='task-list-item__icon' />
            </button>
        </div>
    );
});
