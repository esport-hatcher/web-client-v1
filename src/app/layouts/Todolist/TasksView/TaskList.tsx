import React, { useEffect } from 'react';
import { TaskItem } from 'app/components';
import { useSelector } from 'app/custom-hooks';
import { useDispatch } from 'react-redux';
import { fetchTasks } from 'app/actions';

interface IProps {
    section: string;
}

export const TaskList: React.FC<IProps> = React.memo(() => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div className='task-list'>
            <div className='task-list__item'>
                {tasks.map(task => (
                    <TaskItem task={task} />
                ))}
            </div>
        </div>
    );
});
