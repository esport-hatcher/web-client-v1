import React, { useEffect, useState, useCallback } from 'react';
import { AdminFilters, AdminUsersList } from '@/layouts';
import { SearchField, HeaderPage } from '@/components';
import { parse, stringify } from 'query-string';
import { useDispatch } from 'react-redux';
import { adminPannelFetchUsers, ActionTypes } from '@/actions';
import { useSelector } from '@/custom-hooks';

interface IProps {
    // tslint:disable-next-line: no-any
    history: {
        push: (path: string) => void;
    };
    location: {
        search: string;
    };
}

export interface IAdminPannelFilters {
    username?: string;
    superAdmin?: string;
}

export const _AdminPannel: React.FC<IProps> = ({
    location: { search },
    history: { push },
}) => {
    const initialFilters: IAdminPannelFilters = parse(
        search
    ) as IAdminPannelFilters;
    const [filters, setFilters] = useState<IAdminPannelFilters>(initialFilters);
    const dispatch = useDispatch();
    const users = useSelector(state => state.adminPannel.users);
    const loading = useSelector(state => state.adminPannel.loading);

    useEffect(() => {
        push(`/admin/pannel?${stringify(filters)}`);
        dispatch({ type: ActionTypes.adminPannelSetLoading });
        dispatch(adminPannelFetchUsers(stringify(filters)));
    }, [filters, push, dispatch]);

    const onSearch = useCallback(
        (value: string) => {
            setFilters(filters => {
                return {
                    ...filters,
                    username: value.length > 0 ? value : undefined,
                };
            });
        },
        [setFilters]
    );

    const onFilter = useCallback(
        (value?: string) => {
            setFilters(filters => {
                return {
                    ...filters,
                    superAdmin: value,
                };
            });
        },
        [setFilters]
    );

    return (
        <main className='admin-pannel'>
            <HeaderPage title='Admin Pannel' />
            <AdminFilters
                onFilter={onFilter}
                initialValue={filters.superAdmin}
            />
            <div className='admin-pannel__search'>
                <SearchField
                    onSearch={onSearch}
                    initialValue={filters.username}
                    loading={loading}
                />
            </div>
            <div className='admin-pannel__grid'>
                <AdminUsersList users={users} />
            </div>
        </main>
    );
};
