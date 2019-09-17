import React from 'react';
// tslint:disable-next-line: match-default-export-name
import sprites from '../../../assets/sprite.svg';

export interface IIcons {
    chevron_right: string;
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
    exit: string;
}

export type IconName = keyof IIcons;

interface IIconProps {
    name: IconName;
    className: string;
}

export const Icon = ({ name, className }: IIconProps): JSX.Element => {
    return (
        <svg className={className}>
            <use xlinkHref={`${sprites}#icon-${name}`} />
        </svg>
    );
};
