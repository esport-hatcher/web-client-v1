import React from 'react';
import { createPortal } from 'react-dom';

interface IProps {
    show: boolean;
    setShow: (value: boolean) => void;
    title: string;
    className?: string;
}

export const Modal: React.FC<IProps> = React.memo(
    ({ show, setShow, children, className, title }) => {
        const content = show && (
            <div className='modal'>
                <div
                    className='modal__overlay'
                    onClick={() => setShow(false)}
                />
                <div className='modal__body'>
                    <p className='title title--xs'>{title}</p>
                    <hr className='divider' />
                    <div className={`modal__body__content ${className}`}>
                        {children}
                    </div>
                </div>
            </div>
        );
        return createPortal(content, document.body);
    }
);
