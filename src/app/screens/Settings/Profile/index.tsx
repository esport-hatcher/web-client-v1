import React from 'react';
import { requireLogin } from '@/HOC';

interface IProps {
    noEmpty?: boolean;
}

export const _UserProfile: React.FC<IProps> = () => {
    return <div>User Profile</div>;
};

export const userProfile = requireLogin(_UserProfile);
