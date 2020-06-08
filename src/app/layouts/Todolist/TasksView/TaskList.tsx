import React from 'react';
import { TaskItem } from 'app/components';

interface IProps {
    section: string;
}

export const TaskList: React.FC<IProps> = React.memo(() => {
    const task = [
        {
            name: 'Tache 1',
            date: '12/05/2020',
        },
        {
            name: 'Tache 2',
            date: '21/05/2020',
        },
    ];

    return (
        <div className='task-list'>
            <div className='list-task__form'>
                {task.map(task => (
                    <TaskItem task={task} />
                ))}
            </div>
        </div>
    );
});
