import React, { Component } from 'react';
import { FilterItem } from '@/components';

export class AdminFilters extends Component {
    state = { currentKey: 'all' };

    // tslint:disable-next-line: no-any
    onItemClick = (e: any) => {
        this.setState({ currentKey: e.currentTarget.getAttribute('data-key') });
    };

    render() {
        const { currentKey } = this.state;

        return (
            <div className='admin-filters'>
                <FilterItem
                    name='all'
                    count={95}
                    active={currentKey === 'all' ? true : false}
                    onClick={this.onItemClick}
                />
                <FilterItem
                    name='player'
                    count={18}
                    active={currentKey === 'player' ? true : false}
                    onClick={this.onItemClick}
                />
                <FilterItem
                    name='staff'
                    count={31}
                    active={currentKey === 'staff' ? true : false}
                    onClick={this.onItemClick}
                />
                <FilterItem
                    name='team'
                    count={22}
                    active={currentKey === 'team' ? true : false}
                    onClick={this.onItemClick}
                />
            </div>
        );
    }
}
