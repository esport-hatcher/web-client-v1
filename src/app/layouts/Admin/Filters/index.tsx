import React, { useState, useCallback } from 'react';
import { FilterItem } from '@/components';

enum FilterKeys {
    all = 'all',
    player = 'player',
    staff = 'staff',
    team = 'team',
}

export const AdminFilters: React.FC = React.memo(() => {
    const [currentKey, setCurrentKey] = useState(FilterKeys.all);

    const onItemClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const value = e.currentTarget.getAttribute(
                'data-key'
            ) as FilterKeys;
            setCurrentKey(value);
        },
        [setCurrentKey]
    );

    return (
        <section className='admin-filters'>
            <FilterItem
                name={FilterKeys.all}
                count={95}
                active={currentKey === FilterKeys.all ? true : false}
                onClick={onItemClick}
            />
            <FilterItem
                name={FilterKeys.player}
                count={18}
                active={currentKey === FilterKeys.player ? true : false}
                onClick={onItemClick}
            />
            <FilterItem
                name={FilterKeys.staff}
                count={31}
                active={currentKey === FilterKeys.staff ? true : false}
                onClick={onItemClick}
            />
            <FilterItem
                name={FilterKeys.team}
                count={22}
                active={currentKey === FilterKeys.team ? true : false}
                onClick={onItemClick}
            />
        </section>
    );
});
