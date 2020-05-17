import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
    confirmed: boolean;
    content: string;
    className?: string;
}

export const UserConfirmedInfo: React.FC<IProps> = React.memo(
    ({ confirmed, content, className }) => {
        return (
            <div className={`user-confirmed-info ${className}`}>
                <FontAwesomeIcon
                    className='user-confirmed-info__icon'
                    icon={confirmed ? 'check' : 'times'}
                />
                <p className='user-confirmed-info__content important-info important-info--sm'>
                    {content}
                </p>
            </div>
        );
    }
);
