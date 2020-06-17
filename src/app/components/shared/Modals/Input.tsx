import React from 'react';
import { ModifiableTextArea } from 'app/components';
import { ITask } from 'app/actions';

interface IProps {
    task: ITask;
    onClose: () => void;
    onConfirm: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ModalInput: React.FC<IProps> = React.memo(
    ({ task, onClose, onConfirm }) => {
        return (
            <div className='modal-input'>
                <div className='modal-input__background' onClick={onClose} />
                <div className='modal-input__content'>
                    <p className='title title--xs'>{task.title}</p>
                    <hr className='divider' />
                    <ModifiableTextArea
                        value={task.description}
                        label='Description'
                        name='description'
                        onChange={onConfirm}
                    />
                    <div className='modal-input__content__action-buttons'>
                        <button className='btn btn--primary' onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);
