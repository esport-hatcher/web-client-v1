import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '@/actions';

interface ILogoutProps {
    logout: typeof logout;
}

export const _Logout = ({ logout }: ILogoutProps): JSX.Element => {
    useEffect(() => {
        logout();
    });
    return <Redirect to='/login' />;
};
