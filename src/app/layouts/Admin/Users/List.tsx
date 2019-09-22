import React from 'react';
import { IUser } from '@/actions';

interface IProps {
    users: IUser[];
}

export const AdminUsersList: React.FC<IProps> = ({ users }) => {
    return <div>userslist</div>;
};
