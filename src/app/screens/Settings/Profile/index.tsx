import React from 'react';
import { shallowEqual } from 'react-redux';
import { requireLogin } from '@/HOC';
import { useSelector } from '@/custom-hooks';
import { HeaderPage } from '@/components';
import { UserProfileForm } from '@/layouts/Users/ProfileForm';

interface IProps {
    noEmpty?: boolean;
}

export const _UserProfile: React.FC<IProps> = () => {
    const user = useSelector(state => state.authentication.user, shallowEqual);

    if (user) {
        return (
            <div className='settings-profile'>
                <HeaderPage title={`${user.firstName}'s profile`} />
                <UserProfileForm />
            </div>
        );
    }
    return null;
};

export const userProfile = requireLogin(_UserProfile);
