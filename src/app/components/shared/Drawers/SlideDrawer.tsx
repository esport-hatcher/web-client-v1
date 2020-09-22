import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { IconButton } from '../Buttons';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    bodyClassName?: string;
}

export const SlideDrawer: React.FC<IProps> = React.memo(
    ({ isOpen, onClose, children, className, bodyClassName }) => {
        const [openVisible, setOpenVisible] = useState(false);

        useEffect(() => {
            if (isOpen) {
                setTimeout(() => setOpenVisible(true), 10); // should be increased if their is no animation in drawer entry
            }
        }, [isOpen]);

        const closeDrawer = () => {
            setOpenVisible(false);
            setTimeout(() => onClose(), 300);
        };

        const content = isOpen && (
            <div
                className={cx(
                    'slide-drawer',
                    {
                        'slide-drawer--isOpen': openVisible,
                    },
                    className
                )}
            >
                <IconButton
                    Icon={AiOutlineClose}
                    onClick={closeDrawer}
                    className='slide-drawer__close-btn'
                />
                <div className={`slide-drawer__body ${bodyClassName}`}>
                    {children}
                </div>
            </div>
        );
        return createPortal(content, document.body);
    }
);
