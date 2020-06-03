import React from 'react';
import { Filters, CreateTaskForm } from 'app/layouts';
import { HeaderPage } from 'app/components';

interface IProps {
    location: {
        search: string;
    };
}

export const _TodolistPage: React.FC<IProps> = React.memo(({ location }) => {
    return (
        <main>
            <HeaderPage title='To-do List' />
            <div className='todolist-screen'>
                <Filters />
                <div className='todolist-screen__tasks'>
                    <CreateTaskForm />
                </div>
            </div>
        </main>
    );
});
