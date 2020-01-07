import React from 'react';
import { IModal } from '@/components';

interface IProps extends IModal {
    noEmpty?: boolean;
}

type clickable = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export const ModalConfirmation: React.FC<IProps> = React.memo(
    ({ onClose, title, message, onConfirm }) => {
        return (
            <div className='modal-confirmation'>
                <div
                    className='modal-confirmation__background'
                    onClick={onClose}
                />
                <div className='modal-confirmation__content'>
                    <p className='title title--xs'>{title}</p>
                    <hr className='divider' />
                    <p className='body-text body-text--medium'>{message}</p>
                    <div className='modal-confirmation__content__action-buttons'>
                        <button className='btn btn--primary' onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className='btn btn--secondary'
                            onClick={onConfirm as clickable}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);
