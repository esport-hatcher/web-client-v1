import React, { useEffect, useState, useCallback } from 'react';
import { AdminFilters, AdminUsersList } from '@/layouts';
import { SearchInput, HeaderPage } from '@/components';
import { parse, stringify } from 'query-string';
import { useDispatch, shallowEqual } from 'react-redux';
import {
    adminPannelFetchUsers,
    adminPannelFetchNextPage,
    ActionTypes,
} from '@/actions';
import { useSelector } from '@/custom-hooks';

interface IProps {
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
    const { users, loading, pages } = useSelector(
        state => state.adminPannel,
        shallowEqual
    );
    const [currentPage, setPage] = useState<number>(1);

    useEffect(() => {
        if (currentPage > 1 && currentPage <= pages) {
            dispatch(
                adminPannelFetchNextPage(
                    stringify({ ...filters, page: currentPage })
                )
            );
        }
    }, [currentPage, dispatch, pages, filters]);

    const onBottomPage = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setPage(page => page + 1);
        }
    }, [setPage]);

    useEffect(() => {
        window.addEventListener('scroll', onBottomPage);
        return () => window.removeEventListener('scroll', onBottomPage, true);
    }, [onBottomPage]);

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
            <div className='admin-pannel__content'>
                <div className='admin-pannel__content__search'>
                    <SearchInput
                        onSearch={onSearch}
                        initialValue={filters.username}
                        loading={loading}
                    />
                </div>
                <AdminUsersList users={users} />
            </div>
        </main>
    );
};
