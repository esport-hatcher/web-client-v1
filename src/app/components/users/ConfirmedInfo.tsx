import React from 'react';
import { Icon } from '@/components';

interface IProps {
    confirmed: boolean;
    content: string;
    className?: string;
}

export const UserConfirmedInfo: React.FC<IProps> = React.memo(
    ({ confirmed, content, className }) => {
        return (
            <div className={`user-confirmed-info ${className}`}>
                <Icon
                    className='user-confirmed-info__icon'
                    name={confirmed ? 'check' : 'error'}
                />
                <p className='user-confirmed-info__content important-info important-info--sm'>
                    {content}
                </p>
            </div>
        );
    }
);
