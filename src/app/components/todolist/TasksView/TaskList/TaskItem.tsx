import React from 'react';
import { FiCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

interface IProps {
    task: { name: string; date: string };
}

export const TaskItem: React.FC<IProps> = React.memo(({ task }) => {
    return (
        <div className='task-list-item'>
            <div className='task-list-item__state'>
                <FiCircle />
            </div>
            <div className='task-list-item__content'>
                <div className='task-list-item__name'>{task.name}</div>
                <div className='task-list-item__date'>{task.date}</div>
            </div>
            <button className='task-list-item__edit'>Editer</button>
            <button className='task-list-item__comment'>Commenter</button>
            <button className='task-list-item__delete'>
                <RiDeleteBinLine />
            </button>
        </div>
    );
});
