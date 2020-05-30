import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import cx from 'classnames';

interface IProps {
    Icon: IconType;
    path: string;
    text: string;
    activeText: boolean;
    className?: string;
}

export const NavigationItem: React.FC<IProps> = React.memo(
    ({ Icon, path, text, activeText, className }) => {
        return (
            <NavLink
                to={path}
                activeClassName='nav-bar__item--active'
                className={`nav-bar__item ${className}`}
            >
                <Icon className='nav-bar__item__icon' />
                <p
                    className={cx('nav-bar__item__text', {
                        'nav-bar__item__text--display': activeText,
                    })}
                >
                    {text}
                </p>
            </NavLink>
        );
    }
);
