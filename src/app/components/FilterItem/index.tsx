import React, { Component } from 'react';

interface IFilterItemP {
    name: string;
    count: number;
    active: boolean;
    // tslint:disable-next-line: no-any
    onClick: (e: any) => void;
}

export class FilterItem extends Component<IFilterItemP> {
    render() {
        const { name, count, active, onClick } = this.props;

        return (
            <div
                data-key={name}
                className={`filter-item ${active ? 'filter-item--active' : ''}`}
                onClick={onClick}
            >
                <p className='filter-item__name label-filter'>{name}</p>
                <span className='filter-item__count label-count'>{count}</span>
            </div>
        );
    }
}

export default FilterItem;
