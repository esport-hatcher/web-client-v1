import React, { useCallback } from 'react';
import { FiCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ITask, deleteTask, patchTask } from 'app/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { ModalInput } from 'app/components/shared/Modals/Input';
import { useToggler } from 'app/custom-hooks';

interface IProps {
    task: ITask;
}

export const TaskItem: React.FC<IProps> = ({ task }) => {
    const [showModal, toggleModal] = useToggler(false);

    const dispatch = useDispatch();

    const onConfirmModal = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(patchTask(task, { [e.target.name]: e.target.value }));
        },
        [task, dispatch]
    );

    const handleDelete = useCallback(() => {
        dispatch(deleteTask(task));
    }, [task, dispatch]);

    return (
        <div className='task-list-item'>
            <div className='task-list-item__state'>
                <FiCircle />
            </div>
            <div className='task-list-item__content'>
                <div className='task-list-item__title'>{task.title}</div>
                <div className='task-list-item__dateEnd'>
                    {moment(task.dateEnd).format('YYYY-MM-DD')}
                </div>
            </div>
            <button className='task-list-item__edit'>Edit</button>
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
            <button onClick={handleDelete} className='task-list-item__delete'>
                <RiDeleteBinLine />
            </button>
        </div>
    );
};
