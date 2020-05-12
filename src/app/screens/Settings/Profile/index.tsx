import React from 'react';
import { shallowEqual } from 'react-redux';
import { requireLogin } from 'app/HOC';
import { useSelector } from 'app/custom-hooks';
import { HeaderPage } from 'app/components';
import { SettingsProfileBox } from 'app/layouts';

interface IProps {
    noEmpty?: boolean;
}

export const _SettingsProfile: React.FC<IProps> = React.memo(() => {
    const user = useSelector(state => state.authentication.user, shallowEqual);

    if (user) {
        return (
            <div className='settings-profile'>
                <HeaderPage title={`${user.username}'s profile`} />
                <SettingsProfileBox user={user} />
            </div>
        );
    }
    return null;
});

export const SettingsProfile = requireLogin(_SettingsProfile);
