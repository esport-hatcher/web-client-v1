import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SettingsProfileForm } from './Form';
import { UserAvatar } from 'app/components';
import { IUser, patchUserSession } from 'app/actions';

interface IProps {
    user: IUser;
}

export const SettingsProfileBox: React.FC<IProps> = React.memo(({ user }) => {
    const dispatch = useDispatch();

    const onFileChange = useCallback(
        // tslint:disable-next-line: no-any
        (file: any) => {
            dispatch(patchUserSession({ avatarUrl: file }));
        },
        [dispatch]
    );

    return (
        <div className='settings-profile__box'>
            <h1 className='settings-profile__box__title important-info important-info--xl'>
                Public Profile
            </h1>
            <hr className='divider settings-profile__box__divider' />
            <SettingsProfileForm user={user} />
            <div className='m-t-sm'>
                <UserAvatar
                    changable={true}
                    className='settings-profile__avatar'
                    avatarUrl={user.avatarUrl}
                    onChange={onFileChange}
                />
            </div>
        </div>
    );
});
