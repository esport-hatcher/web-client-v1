import React from 'react';
import { SettingsProfileForm } from './Form';
import { UserAvatar } from '@/components';
import { IUser } from '@/actions';

interface IProps {
    user: IUser;
}

export const SettingsProfileBox: React.FC<IProps> = React.memo(({ user }) => {
    return (
        <div className='settings-profile__box'>
            <h1 className='settings-profile__box__title important-info important-info--big'>
                Public Profile
            </h1>
            <hr className='divider settings-profile__box__divider' />
            <SettingsProfileForm user={user} />
            <div className='m-t-sm'>
                <UserAvatar
                    changable={true}
                    className='settings-profile__avatar'
                    avatarUrl={user.avatarUrl}
                />
            </div>
        </div>
    );
});
