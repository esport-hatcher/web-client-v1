import React from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import cx from 'classnames';

interface IProps {
    confirmed: boolean;
    content: string;
    className?: string;
}

export const UserConfirmedInfo: React.FC<IProps> = React.memo(
    ({ confirmed, content, className }) => {
        const getIconStatus = (): IconType =>
            confirmed ? AiOutlineCheck : AiOutlineClose;

        const IconStatus = getIconStatus();
        return (
            <div className={`user-confirmed-info ${className}`}>
                <IconStatus
                    className={cx(
                        'user-confirmed-info__icon icon icon--rosy-pink',
                        {
                            'icon--green': confirmed,
                        }
                    )}
                />
                <p className='user-confirmed-info__content important-info important-info--sm'>
                    {content}
                </p>
            </div>
        );
    }
);
