import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

interface IProps {
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    icon: IconProp;
    path: string;
    text: string;
    active: boolean;
    activeText: boolean;
    className?: string;
}

export const NavigationItem: React.FC<IProps> = React.memo(
    ({ active, icon, onClick, path, text, activeText, className }) => {
        return (
            <Link
                to={path}
                className={`nav-bar__item ${active &&
                    'nav-bar__item--active'} ${className}`}
                onClick={onClick}
            >
                <FontAwesomeIcon className='nav-bar__item__icon' icon={icon} />
                <p
                    className={`nav-bar__item__text ${activeText &&
                        'nav-bar__item__text--display'}`}
                >
                    {text}
                </p>
            </Link>
        );
    }
);
