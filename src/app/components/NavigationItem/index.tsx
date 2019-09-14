import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconName } from '@/components';

interface INavigationItemP {
    // tslint:disable-next-line: no-any
    onClick: (e: any) => void;
    icon: IconName;
    path: string;
    text: string;
    active: boolean;
    activeText: boolean;
    className?: string;
}
export class NavigationItem extends Component<INavigationItemP> {
    render() {
        const {
            active,
            icon,
            onClick,
            path,
            text,
            activeText,
            className,
        } = this.props;

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
    }
}
