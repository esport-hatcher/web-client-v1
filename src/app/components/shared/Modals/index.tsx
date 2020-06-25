import React from 'react';
import { createPortal } from 'react-dom';

interface IProps {
    show: boolean;
    setShow: (value: boolean) => void;
    bodyClassName?: string;
}

export const Modal: React.FC<IProps> = React.memo(
    ({ show, setShow, children, bodyClassName }) => {
        const content = show && (
            <div className='modal'>
                <div
                    className='modal__overlay'
                    onClick={() => setShow(false)}
                />
                <div className={`modal__content ${bodyClassName}`}>
                    {children}
                </div>
            </div>
        );
        return createPortal(content, document.body);
    }
);
