import React, { useState, useEffect } from 'react';
import { TaskItem } from 'app/components';
import { useSelector } from 'app/custom-hooks';
import { useDispatch, shallowEqual } from 'react-redux';
import { fetchTasks, ITask, ITeams } from 'app/actions';
import {
    getTodoTasks,
    getCompletedTasks,
    getTodayTasks,
    getNext7Days,
} from 'app/reducers';

interface IProps {
    section: string;
    selectedTeam: ITeams | undefined;
}

export const TaskList: React.FC<IProps> = React.memo(
    ({ section, selectedTeam }) => {
        const dispatch = useDispatch();
        const tasks = useSelector(state => state.tasks, shallowEqual);
        const [filteredTasks, setFilteredTasks] = useState([...tasks]);

        useEffect(() => {
            dispatch(fetchTasks(selectedTeam));
        }, [dispatch, selectedTeam]);

        useEffect(() => {
            switch (section) {
                case 'Today':
                    setFilteredTasks(getTodayTasks([...tasks]));
                    break;
                case 'Next 7 days':
                    setFilteredTasks(getNext7Days([...tasks]));
                    break;
                case 'Archive':
                    setFilteredTasks(getCompletedTasks([...tasks]));
                    break;
                default:
                    setFilteredTasks(getTodoTasks([...tasks]));
                    break;
            }
        }, [section, tasks]);

        const renderList = (tasks: ITask[]): JSX.Element[] => {
            return tasks.map(task => {
                return <TaskItem key={task.id} task={task} />;
            });
        };
        return <div className='task-list'>{renderList(filteredTasks)}</div>;
    }
);
