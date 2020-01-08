import React from 'react';
// tslint:disable-next-line: match-default-export-name
import sprites from '../../../assets/sprite.svg';

export interface IIcons {
    rotate_right: string;
    mountain: string;
    portrait: string;
    pin: string;
    smartphone: string;
    chevron_right: string;
    chevron_left: string;
    chat: string;
    settings: string;
    trends: string;
    search: string;
    infinite: string;
    mail: string;
    pen: string;
    lock: string;
    error: string;
    check: string;
    sync: string;
    phone: string;
    exit: string;
    cross: string;
    teams: string;
    clipboard: string;
    bell: string;
    add: string;
}

export type IconName = keyof IIcons;

interface IProps {
    name: IconName;
    className: string;
    onClick?: () => void;
}

export const Icon: React.FC<IProps> = React.memo(
    ({ name, className, onClick }) => {
        return (
            <svg className={`icon ${className}`} onClick={onClick}>
                <use xlinkHref={`${sprites}#icon-${name}`} />
            </svg>
        );
    }
);
