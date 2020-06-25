import React from 'react';
import { Modal } from 'app/components/shared';
import { IUser } from 'app/actions';

interface IProps extends React.ComponentProps<typeof Modal> {
    user: IUser;
    onConfirm: () => void;
}

export const UserDeleteConfirmation: React.FC<IProps> = React.memo(
    ({ show, setShow, user, onConfirm }) => {
        return (
            <Modal show={show} setShow={setShow} bodyClassName='modal--grid'>
                <p className='title title--xs'>
                    Confirm {user.username} deletion ?
                </p>
                <hr className='divider' />
                <p className='body-text body-text--sm'>
                    All data related to {user.username}'s account will be
                    erased.
                </p>
                <div className='modal__action-buttons'>
                    <button
                        className='btn btn--primary'
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </button>
                    <button className='btn btn--secondary' onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </Modal>
        );
    }
);
