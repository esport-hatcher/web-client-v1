import React, { useCallback, useState } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import { IUser, deleteUser } from 'app/actions';
import { UserConfirmedInfo, UserAvatar } from 'app/components';
import { useSelector } from 'app/custom-hooks';
import { UserDeleteConfirmation } from './Delete';

interface IProps {
    user: IUser;
}

export const AdminUserCard: React.FC<IProps> = React.memo(({ user }) => {
    const [showModal, setShowModal] = useState(false);
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
            <UserDeleteConfirmation
                onConfirm={onConfirmModal}
                setShow={setShowModal}
                show={showModal}
                user={user}
                title={`Are you sure you want to delete ${user.username}'s account ?`}
            />
            <div className='admin-user-card__names'>
                <p className='admin-user-card__names__firstname important-info important-info--xl'>
                    {user.firstName}
                </p>
                <p className='admin-user-card__names__lastname important-info important-info--xl m-t-xs'>
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
                    onClick={() => setShowModal(true)}
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
