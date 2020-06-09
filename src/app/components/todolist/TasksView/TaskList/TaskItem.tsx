import React, { useEffect } from 'react';
import { FiCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ITask, deleteTasks } from 'app/actions';
import tasksReducer from 'app/reducers/tasks';
import { useSelector } from 'app/custom-hooks';
import { useDispatch } from 'react-redux';

interface IProps {
    task: ITask;
}

export const TaskItem: React.FC<IProps> = React.memo(({ task }) => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);

    const handleClick = (action: string) => {
        dispatch(deleteTasks(task));
    };

    return (
        <div className='task-list-item'>
            <div className='task-list-item__state'>
                <FiCircle />
            </div>
            <div className='task-list-item__content'>
                <div className='task-list-item__title'>{task.title}</div>
                <div className='task-list-item__deadline'>{task.deadline}</div>
            </div>
            <button className='task-list-item__edit'>Editer</button>
            <button className='task-list-item__comment'>Commenter</button>
            <button
                onClick={() => handleClick('delete')}
                className='task-list-item__delete'
            >
                <RiDeleteBinLine />
            </button>
        </div>
    );
});
