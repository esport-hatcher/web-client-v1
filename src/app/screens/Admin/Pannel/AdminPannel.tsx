import React from 'react';
import { AdminFilters } from '@/layouts';
import { SearchField, HeaderPage } from '@/components';

export const _AdminPannel = (): JSX.Element => {
    return (
        <div className='admin-pannel'>
            <HeaderPage title='Admin Pannel' />
            <AdminFilters />
            <div className='admin-pannel__search'>
                <SearchField />
            </div>
            <div className='admin-pannel__grid'>Container grid</div>
        </div>
    );
};
