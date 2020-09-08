import React, { useState, useEffect, Fragment } from 'react';
import { TaskItem } from 'app/components';
import { useSelector } from 'app/custom-hooks';
import { useDispatch, shallowEqual } from 'react-redux';
import { fetchTasks, ITask, ITeam } from 'app/actions';
import {
    getTodoTasks,
    getCompletedTasks,
    getTodayTasks,
    getNext7Days,
    getLateTasks,
} from 'app/reducers';

interface IProps {
    section: string;
    selectedTeam: ITeam | undefined;
}

export const TaskList: React.FC<IProps> = React.memo(
    ({ section, selectedTeam }) => {
        const dispatch = useDispatch();
        const tasks = useSelector(state => state.tasks, shallowEqual);
        const [filteredTasks, setFilteredTasks] = useState([...tasks]);
        const [lateTasks, setLateTasks] = useState<ITask[]>([]);

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

        useEffect(() => {
            if (section === 'Inbox' || section === 'Today') {
                setLateTasks(getLateTasks([...tasks]));
            } else {
                setLateTasks(getLateTasks([]));
            }
        }, [section, tasks]);

        const renderList = (tasks: ITask[]) => {
            if (filteredTasks.length !== 0) {
                return (
                    <Fragment>
                        {section !== 'Archive' && <h2>To-do</h2>}
                        {tasks.map(task => {
                            return (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    late={false}
                                />
                            );
                        })}
                    </Fragment>
                );
            }
        };

        const renderLateTasks = () => {
            if (lateTasks.length !== 0) {
                return (
                    <Fragment>
                        <h2>Late</h2>
                        {lateTasks.map(task => {
                            return (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    late={true}
                                />
                            );
                        })}
                        <br />
                    </Fragment>
                );
            }
        };

        return (
            <div className='task-list'>
                {renderLateTasks()}
                {renderList(filteredTasks)}
            </div>
        );
    }
);
