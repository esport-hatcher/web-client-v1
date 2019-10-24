import React from 'react';

interface IProps {
    avatarUrl: string;
}

export const SettingsProfileAvatar: React.FC<IProps> = React.memo(
    ({ avatarUrl }) => {
        return (
            <figure className='settings-profile__avatar'>
                <img
                    src={avatarUrl}
                    className='settings-profile__avatar__img'
                />
                <figcaption className='settings-profile__avatar__button important-info important-info--sm'>
                    Change
                </figcaption>
            </figure>
        );
    }
);
