import React from 'react';
import { Modal, BoxHeader } from 'app/components';
import { IUser } from 'app/actions';

interface IProps extends React.ComponentProps<typeof Modal> {
    user: IUser;
    onConfirm: () => void;
}

export const UserDeleteConfirmation: React.FC<IProps> = React.memo(
    ({ show, setShow, user, onConfirm }) => {
        return (
            <Modal
                show={show}
                setShow={setShow}
                className='admin-user-card__delete-modal'
            >
                <BoxHeader
                    title={`Are you sure you want to delete ${user.username}'s account ?`}
                    size='xs'
                />
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
