import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IIcons } from '@/components';

interface INavigationItemP {
    // tslint:disable-next-line: no-any
    onClick: (e: any) => void;
    icon: keyof IIcons;
    path: string;
    text: string;
    active: boolean;
    activeText: boolean;
}
export class NavigationItem extends Component<INavigationItemP> {
    render() {
        const { active, icon, onClick, path, text, activeText } = this.props;

        return (
            <Link
                to={path}
                className={`nav-bar__item ${
                    active ? 'nav-bar__item--active' : ''
                }`}
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
