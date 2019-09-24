import React from 'react';
import { IUser } from '@/actions';
import { AdminUserCard } from '@/components';

interface IProps {
    users: IUser[];
}

export const AdminUsersList: React.FC<IProps> = ({ users }) => {
    return <AdminUserCard user={users[0]} />;
};
