import React from 'react';

interface IFilterItemProps {
    name: string;
    count: number;
    active: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const FilterItem = ({
    name,
    count,
    active,
    onClick,
}: IFilterItemProps): JSX.Element => {
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
};
