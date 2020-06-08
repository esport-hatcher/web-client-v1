import React from 'react';
import { FiCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ITask } from 'app/actions';

interface IProps {
    task: ITask;
}

export const TaskItem: React.FC<IProps> = React.memo(({ task }) => {
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
            <button className='task-list-item__delete'>
                <RiDeleteBinLine />
            </button>
        </div>
    );
});
