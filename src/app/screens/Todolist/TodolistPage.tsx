import React from 'react';
import { Filters } from 'app/layouts';
import { HeaderPage } from 'app/components';

interface IProps {}

export const _TodolistPage: React.FC = React.memo(() => {
    return (
        <main className='todolist-screen'>
            <HeaderPage title='To-do List' />
            <Filters />
        </main>
    );
});
