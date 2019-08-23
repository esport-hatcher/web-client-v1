import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// tslint:disable-next-line: match-default-export-name
import sprites from '../../../assets/sprite.svg';

interface INavigationItemP {
    // tslint:disable-next-line: no-any
    onClick: (e: any) => void;
    icon: string;
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
                <svg className='nav-bar__item__icon'>
                    <use xlinkHref={`${sprites}#icon-${icon}`} />
                </svg>
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

export default NavigationItem;
