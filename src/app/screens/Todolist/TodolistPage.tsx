import React from 'react';
import { Filters, CreateTask } from 'app/layouts';
import { HeaderPage } from 'app/components';
import { useToggler } from 'app/custom-hooks';
import { parse } from 'query-string';

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
    const [showCreateTask, setShowCreateTask] = useToggler(false);
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
    return (
        <main>
            <HeaderPage title='To-do List' />
            <div className='todolist-screen'>
                <Filters />
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
                        <CreateTask setShowCreateTask={setShowCreateTask} />
                    )}
                </div>
            </div>
        </main>
    );
});
