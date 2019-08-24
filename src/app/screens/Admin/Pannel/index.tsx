import React, { Component } from 'react';
import Header from '@/layouts/Header';
import AdminFilters from '@/layouts/Admin/Filters';
import SearchField from '@/components/SearchField/index';

export class AdminPannel extends Component {
    render() {
        return (
            <div className='admin-pannel'>
                <Header title='Admin Pannel' />
                <AdminFilters />
                <div className='admin-pannel__search'>
                    <SearchField />
                </div>
                <div className='admin-pannel__grid'>Container grid</div>
            </div>
        );
    }
}

export default AdminPannel;
