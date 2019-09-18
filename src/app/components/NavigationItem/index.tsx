import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconName } from '@/components';

interface IProps {
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    icon: IconName;
    path: string;
    text: string;
    active: boolean;
    activeText: boolean;
    className?: string;
}

export const NavigationItem: React.FC<IProps> = ({
    active,
    icon,
    onClick,
    path,
    text,
    activeText,
    className,
}) => {
    return (
        <Link
            to={path}
            className={`nav-bar__item ${
                active ? 'nav-bar__item--active' : ''
            } ${className}`}
            onClick={onClick}
        >
            <Icon className='nav-bar__item__icon' name={icon} />
            <p
                className={`nav-bar__item__text ${
                    activeText ? 'nav-bar__item__text--display' : ''
                }`}
            >
                {text}
            </p>
        </Link>
    );
};
