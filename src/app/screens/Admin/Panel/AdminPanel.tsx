import React, { useEffect, useState, useCallback } from 'react';
import { parse, stringify } from 'query-string';
import { useDispatch, shallowEqual } from 'react-redux';
import { AdminFilters, AdminUsersList } from 'app/layouts';
import { SearchInput, HeaderPage } from 'app/components';
import {
    adminPanelFetchUsers,
    adminPanelFetchNextPage,
    ActionTypes,
} from 'app/actions';
import { useSelector } from 'app/custom-hooks';
import { RouteComponentProps } from 'react-router-dom';

interface IProps {}

export interface IAdminPanelFilters {
    username?: string;
    superAdmin?: string;
}

export const _AdminPanel: React.FC<IProps & RouteComponentProps> = ({
    location: { search },
    history: { push },
}) => {
    const initialFilters: IAdminPanelFilters = parse(
        search
    ) as IAdminPanelFilters;
    const [filters, setFilters] = useState<IAdminPanelFilters>(initialFilters);
    const dispatch = useDispatch();
    const { users, loading, pages } = useSelector(
        state => state.adminPanel,
        shallowEqual
    );
    const [currentPage, setPage] = useState<number>(1);

    useEffect(() => {
        if (currentPage > 1 && currentPage <= pages) {
            dispatch(
                adminPanelFetchNextPage(
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
        /** TODO: FIX URL PARAMETERS */
        // push(`/admin/Panel?${stringify(filters)}`);
        dispatch({ type: ActionTypes.adminPanelSetLoading });
        dispatch(adminPanelFetchUsers(stringify(filters)));
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
        <main className='admin-panel'>
            <HeaderPage title='Admin Panel'>
                <AdminFilters
                    onFilter={onFilter}
                    initialValue={filters.superAdmin}
                />
            </HeaderPage>
            <div className='admin-panel__content'>
                <div className='admin-panel__content__search'>
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
