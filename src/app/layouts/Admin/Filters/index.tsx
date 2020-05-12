import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { FilterItem } from 'app/components';
import { adminpannelCountFilters } from 'app/actions';
import { useSelector } from 'app/custom-hooks';

enum FilterKeys {
    all = 'all',
    player = 'player',
    admin = 'admin',
}

interface IProps {
    onFilter: (value?: string) => void;
    initialValue?: string;
}

const extractParentValue = (value?: string): FilterKeys => {
    switch (value) {
        case '1':
            return FilterKeys.admin;
        case '0':
            return FilterKeys.player;
        default:
            return FilterKeys.all;
    }
};

const extractFilters = (filter: FilterKeys): string | undefined => {
    switch (filter) {
        case FilterKeys.admin:
            return '1';
        case FilterKeys.player:
            return '0';
        default:
            return undefined;
    }
};

export const AdminFilters: React.FC<IProps> = React.memo(
    ({ onFilter, initialValue }) => {
        const [currentKey, setCurrentKey] = useState(
            extractParentValue(initialValue)
        );
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(adminpannelCountFilters());
        }, [dispatch]);

        const filters = useSelector(
            state => state.adminPannel.filters,
            shallowEqual
        );

        const onItemClick = useCallback(
            (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const value = e.currentTarget.getAttribute(
                    'data-key'
                ) as FilterKeys;
                setCurrentKey(value);
                onFilter(extractFilters(value));
            },
            [onFilter]
        );

        return (
            <section className='admin-filters'>
                <FilterItem
                    name={FilterKeys.all}
                    count={filters.all}
                    active={currentKey === FilterKeys.all ? true : false}
                    onClick={onItemClick}
                />
                <FilterItem
                    name={FilterKeys.admin}
                    count={filters.admins}
                    active={currentKey === FilterKeys.admin ? true : false}
                    onClick={onItemClick}
                />
                <FilterItem
                    name={FilterKeys.player}
                    count={filters.players}
                    active={currentKey === FilterKeys.player ? true : false}
                    onClick={onItemClick}
                />
            </section>
        );
    }
);
