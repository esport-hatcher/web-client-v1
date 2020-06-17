import React, { useCallback } from 'react';
import { FiCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { ITask, deleteTask, patchTask } from 'app/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { ModalInput } from 'app/components/shared/Modals/Input';
import { useToggler, useInput } from 'app/custom-hooks';

interface IProps {
    task: ITask;
}

export const TaskItem: React.FC<IProps> = React.memo(({ task }) => {
    const [showModal, toggleModal] = useToggler(false);
    const [inputMode, setInputMode] = useToggler(false);
    const [inputValue, setInputValue] = useInput(task.title);

    const dispatch = useDispatch();

    const displayValue = () => {
        if (task.title === inputValue) {
            return task.title;
        }
        return inputValue;
    };

    const onInputChange = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            dispatch(patchTask(task, { [e.target.name]: e.target.value }));
        },
        [task, dispatch]
    );

    const onLoseFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        onInputChange(e);
        setInputMode();
    };

    const onConfirmModal = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(patchTask(task, { [e.target.name]: e.target.value }));
        },
        [task, dispatch]
    );

    const onCompleteTask = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(patchTask(task, { completed: true }));
        },
        [task, dispatch]
    );

    const handleDelete = useCallback(() => {
        dispatch(deleteTask(task));
    }, [task, dispatch]);

    const displayContent = () => {
        if (inputMode) {
            return (
                <div>
                    <input
                        className='modifiable-input__input important-info important-info--md'
                        value={inputValue}
                        onChange={setInputValue}
                        autoFocus
                        name='title'
                        onBlur={onLoseFocus}
                    />
                </div>
            );
        }
        return <p className='task-list-item__title'>{displayValue()}</p>;
    };

    return (
        <div className='task-list-item'>
            <div className='task-list-item__state'>
                <FiCircle />
            </div>

            {/* TASK TITLE */}
            <div className='task-list-item__content'>
                <div className='task-list-item__title'>{displayContent()}</div>
                <div className='task-list-item__dateEnd'>
                    {moment(task.dateEnd).format('YYYY-MM-DD')}
                </div>
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
                <FaCheck />
            </button>
            <button onClick={handleDelete} className='task-list-item__delete'>
                <RiDeleteBinLine />
            </button>
        </div>
    );
});
