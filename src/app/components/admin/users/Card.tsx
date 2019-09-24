import React from 'react';
import { IUser } from '@/actions';

interface IProps {
    user: IUser;
}

export const AdminUserCard: React.FC<IProps> = ({ user }) => {
    return <div>{user.id}</div>;
};
