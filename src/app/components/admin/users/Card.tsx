import React from 'react';
import { IUser } from '@/actions';
import { UserConfirmedInfo, UserAvatar } from '@/components';
import { useToggler } from '@/custom-hooks';
import { ModalConfirmation } from '@/components/modals';

interface IProps {
    user: IUser;
}

export const AdminUserCard: React.FC<IProps> = React.memo(({ user }) => {
    const [showModal, toggleModal] = useToggler(false);

    const displayModal = () => {
        if (showModal) {
            return <ModalConfirmation onClose={toggleModal} />;
        }
    };

    return (
        <div className='admin-user-card'>
            {displayModal()}
            <div className='admin-user-card__names'>
                <p className='admin-user-card__names__firstname important-info important-info--big'>
                    {user.firstName}
                </p>
                <p className='admin-user-card__names__lastname important-info important-info--big m-t-xs'>
                    {user.lastName}
                </p>
            </div>
            <UserAvatar
                avatarUrl={user.avatarUrl}
                changable={false}
                className='admin-user-card__avatar'
            />
            <p className='admin-user-card__username placeholder placeholder--sm'>
                {user.username}
            </p>
            <UserConfirmedInfo
                className='admin-user-card__email'
                confirmed={true}
                content={user.email}
            />
            <UserConfirmedInfo
                className='admin-user-card__phone m-t-xs'
                confirmed={true}
                content={user.phoneNumber}
            />
            <div className='admin-user-card__action-buttons'>
                <button
                    className='admin-user-card__action-buttons__button admin-user-card__action-buttons__button--1 btn btn--primary'
                    onClick={toggleModal}
                >
                    Delete
                </button>
                <button className='admin-user-card__action-buttons__button admin-user-card__action-buttons__button--2 btn btn--secondary'>
                    Logs
                </button>
                <button className='admin-user-card__action-buttons__button admin-user-card__action-buttons__button--3 btn btn--tertiary'>
                    ...
                </button>
            </div>
        </div>
    );
});
