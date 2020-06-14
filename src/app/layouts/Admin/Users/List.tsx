import React from 'react';
import { IUser } from 'app/actions';
import { AdminUserCard } from 'app/components';

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
                <p className='admin-panel__content__error-msg error-msg error-msg--big'>
                    No matches.
                </p>
            )}
        </>
    );
});
