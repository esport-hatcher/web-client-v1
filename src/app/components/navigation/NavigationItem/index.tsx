import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons/lib';

interface IProps {
    // TODO: PUT RIGHT TYPE
    // tslint:disable-next-line: no-any
    Icon: IconType;
    path: string;
    text: string;
    active: boolean;
    activeText: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const NavigationItem: React.FC<IProps> = React.memo(
    ({ active, Icon, onClick, path, text, activeText, className }) => {
        return (
            <Link
                to={path}
                className={`nav-bar__item ${active &&
                    'nav-bar__item--active'} ${className}`}
                onClick={onClick}
            >
                <Icon className='nav-bar__item__icon' />
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
