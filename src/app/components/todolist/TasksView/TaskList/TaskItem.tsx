import React, { useCallback } from 'react';
import { FiCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ITask, deleteTask } from 'app/actions';
import { useDispatch } from 'react-redux';

interface IProps {
    task: ITask;
}

export const TaskItem: React.FC<IProps> = React.memo(({ task }) => {
    const dispatch = useDispatch();

    const handleDelete = useCallback(() => dispatch(deleteTask(task)), [
        dispatch,
        task,
    ]);

    return (
        <div className='task-list-item'>
            <div className='task-list-item__state'>
                <FiCircle />
            </div>
            <div className='task-list-item__content'>
                <div className='task-list-item__title'>{task.title}</div>
                <div className='task-list-item__deadline'>{task.deadline}</div>
            </div>
            <button className='task-list-item__edit'>Edit</button>
            <button className='task-list-item__comment'>Comment</button>
            <button onClick={handleDelete} className='task-list-item__delete'>
                <RiDeleteBinLine />
            </button>
        </div>
    );
});
