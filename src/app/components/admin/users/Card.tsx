import React, { useCallback } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { IUser, deleteUser } from 'app/actions';
import {
    UserConfirmedInfo,
    UserAvatar,
    ModalConfirmation,
} from 'app/components';
import { useToggler, useSelector } from 'app/custom-hooks';

interface IProps {
    user: IUser;
}

export const AdminUserCard: React.FC<IProps> = React.memo(({ user }) => {
    const [showModal, toggleModal] = useToggler(false);
    const userSession = useSelector(
        state => state.authentication.user,
        shallowEqual
    );
    const dispatch = useDispatch();

    const onConfirmModal = useCallback(() => dispatch(deleteUser(user)), [
        dispatch,
        user,
    ]);

    return (
        <div className='admin-user-card'>
            {showModal && (
                <ModalConfirmation
                    title={`Confirm ${user.username} deletion ?`}
                    message={`All data related to ${user.username}'s account will be erased.`}
                    onClose={toggleModal}
                    onConfirm={onConfirmModal}
                />
            )}
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
                    disabled={user.id === userSession!.id}
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
