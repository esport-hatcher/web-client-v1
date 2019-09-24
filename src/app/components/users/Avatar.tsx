import React from 'react';

interface IProps {
    src: string;
    className?: string;
}

export const UserAvatar: React.FC<IProps> = React.memo(({ src, className }) => {
    return (
        <img
            className={`user-avatar ${className}`}
            src={src}
            alt={`User avatar: ${src}`}
        />
    );
});
