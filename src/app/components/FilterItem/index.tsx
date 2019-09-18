import React from 'react';

interface IProps {
    name: string;
    count: number;
    active: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const FilterItem: React.FC<IProps> = React.memo(
    ({ name, count, active, onClick }) => {
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
);
