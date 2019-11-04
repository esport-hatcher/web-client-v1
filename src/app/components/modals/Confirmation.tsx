import React from 'react';
import { HeaderPage } from '../various';

interface IProps {
    onClose: () => void;
}

export const ModalConfirmation: React.FC<IProps> = React.memo(({ onClose }) => {
    return (
        <div className='modal-confirmation'>
            <div
                className='modal-confirmation__background'
                onClick={onClose}
            ></div>
            <div className='modal-confirmation__content'>
                <p className='title title--xs'>Confirm Arthur's deletion ?</p>
                <hr className='divider' />
                <p className='body-text body-text--medium'>
                    All data related to Arthur's account will be erased.
                </p>
                <div className='modal-confirmation__content__action-buttons'>
                    <button className='btn btn--primary' onClick={onClose}>
                        Cancel
                    </button>
                    <button className='btn btn--secondary'>Confirm</button>
                </div>
            </div>
        </div>
    );
});
