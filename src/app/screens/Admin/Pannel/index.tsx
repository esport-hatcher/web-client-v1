import React, { Component } from 'react';
import { AdminFilters } from '@/layouts';
import { SearchField, HeaderPage } from '@/components';
import { requireLogin } from '@/HOC';

class _AdminPannel extends Component {
    render() {
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
    }
}

export const AdminPannel = requireLogin(_AdminPannel);
