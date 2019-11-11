import React from 'react';

interface IProps {
    avatarUrl: string;
    changable: boolean;
    className?: string;
}

export const UserAvatar: React.FC<IProps> = React.memo(
    ({ avatarUrl, changable, className }) => {
        return (
            <figure className={`user-avatar ${className}`}>
                <img
                    src={avatarUrl}
                    className='user-avatar__img'
                    alt={avatarUrl}
                />
                {changable && (
                    <figcaption className='user-avatar__button important-info important-info--sm'>
                        Change
                    </figcaption>
                )}
            </figure>
        );
    }
);
