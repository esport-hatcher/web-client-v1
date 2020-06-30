import React from 'react';

interface IProps {
    title: string;
    className?: string;
    size?: 'xs' | 'sm' | 'md' | 'xl';
}

export const BoxHeader: React.FC<IProps> = ({
    title,
    className,
    size = 'sm',
}) => {
    return (
        <div className={className}>
            <p className={`title title--${size}`}>{title}</p>
            <hr className={`divider m-t-${size}`} />
        </div>
    );
};
