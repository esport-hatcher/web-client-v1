import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '@/actions';

interface IProps {
    logout: typeof logout;
}

export const _Logout = ({ logout }: IProps): JSX.Element => {
    useEffect(() => {
        logout();
    });
    return <Redirect to='/login' />;
};
