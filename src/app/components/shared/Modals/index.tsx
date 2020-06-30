import React from 'react';
import { createPortal } from 'react-dom';

interface IProps {
    show: boolean;
    setShow: (value: boolean) => void;
    className?: string;
}

export const Modal: React.FC<IProps> = React.memo(
    ({ show, setShow, children, className }) => {
        const content = show && (
            <div className='modal'>
                <div
                    className='modal__overlay'
                    onClick={() => setShow(false)}
                />
                <div className={`${className} modal__body`}>{children}</div>
            </div>
        );
        return createPortal(content, document.body);
    }
);
