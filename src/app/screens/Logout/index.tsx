import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'app/actions';

export const Logout = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    });
    return <Redirect to='/login' />;
};
