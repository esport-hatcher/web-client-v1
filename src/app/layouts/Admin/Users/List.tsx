import React from 'react';
import { IUser } from '@/actions';
import { AdminUserCard } from '@/components';

interface IProps {
    users: IUser[];
}

export const AdminUsersList: React.FC<IProps> = React.memo(({ users }) => {
    const renderList = (): JSX.Element[] => {
        return users.map(user => {
            return <AdminUserCard key={user.id} user={user} />;
        });
    };

    return (
        <>
            {users.length > 0 ? (
                renderList()
            ) : (
                <p className='admin-pannel__grid__error-msg error-msg error-msg--big'>
                    No matches.
                </p>
            )}
        </>
    );
});
