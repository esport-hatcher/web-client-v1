import React from 'react';
import { shallowEqual } from 'react-redux';
import { useSelector } from 'app/custom-hooks';
import { NavBar } from './Navigation';

export const Navigation: React.FC = () => {
    const user = useSelector(state => state.authentication.user, shallowEqual);
    if (user) {
        return <NavBar admin={user.superAdmin} />;
    }
    return null;
};
