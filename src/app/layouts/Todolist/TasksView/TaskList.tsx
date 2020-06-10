import React, { useEffect } from 'react';
import moment from 'moment';
import { remove } from 'lodash';
import { TaskItem } from 'app/components';
import { useSelector } from 'app/custom-hooks';
import { useDispatch, shallowEqual } from 'react-redux';
import { fetchTasks } from 'app/actions';

interface IProps {
    section: string;
}

export const TaskList: React.FC<IProps> = ({ section }) => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks, shallowEqual);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // const currentDayTasks = remove(tasks, task => {
    //     return moment(task.deadline).isSame(new Date(), 'week');
    // });
    // const currentMonthTasks = remove(tasks, task => {
    //     return moment(task.deadline).isSame(new Date(), 'month');
    // });
    const renderList = (): JSX.Element[] => {
        return tasks.map(task => {
            return <TaskItem key={task.id} task={task} />;
        });
    };
    return (
        <div className='task-list'>
            {tasks.length > 0 ? renderList() : <p>No tasks.</p>}
            {/* {currentMonthTasks.map(task => {
                return <div>{task.deadline}</div>;
            })}
            {currentDayTasks.map(task => {
                <TaskItem task={task} />;
            })} */}
        </div>
    );
};
