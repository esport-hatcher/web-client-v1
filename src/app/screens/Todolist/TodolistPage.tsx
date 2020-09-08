import React, { useEffect, useState } from 'react';
import { Filters, CreateTask, TaskList } from 'app/layouts';
import { HeaderPage } from 'app/components';
import { useToggler, useSelector } from 'app/custom-hooks';
import { parse } from 'query-string';
import { fetchTeams, ITeam } from 'app/actions';
import { useDispatch, shallowEqual } from 'react-redux';

interface IProps {
    location: {
        search: string;
    };
}

interface IFilters {
    filter?: string; // Inbox, Today, Next 7 days or Archive
    people?: string; // Team or Club
}

export const _TodolistPage: React.FC<IProps> = React.memo(({ location }) => {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.teams, shallowEqual);
    const [showCreateTask, setShowCreateTask] = useToggler(false);
    const [selectedTeam, setSelectedTeam] = useState<ITeam>();
    const section: IFilters = parse(location.search) as IFilters;
    const title = () => {
        return section.filter === 'today'
            ? 'Today'
            : section.filter === 'sevendays'
            ? 'Next 7 days'
            : section.filter === 'archive'
            ? 'Archive'
            : 'Inbox';
    };
    useEffect(() => {
        dispatch(fetchTeams());
    }, [dispatch]);

    return (
        <main>
            <HeaderPage title='To-do List' />
            <div className='todolist-screen'>
                <Filters
                    teams={teams.teams}
                    setSelectedTeam={setSelectedTeam}
                />
                <div className='todolist-screen__tasks'>
                    <h1 className='todolist-screen__tasks__title'>{title()}</h1>
                    {!showCreateTask && (
                        <button
                            onClick={setShowCreateTask}
                            className='todolist-screen__tasks__button-create'
                        >
                            Add a task
                        </button>
                    )}
                    {showCreateTask && (
                        <CreateTask
                            setShowCreateTask={setShowCreateTask}
                            selectedTeam={selectedTeam}
                        />
                    )}
                    <TaskList section={title()} selectedTeam={selectedTeam} />
                </div>
            </div>
        </main>
    );
});
