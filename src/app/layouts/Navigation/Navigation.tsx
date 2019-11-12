import React, { useState, useEffect, useCallback } from 'react';
import { routes } from '@/config';
import { NavigationItem, Icon } from '@/components';

interface IProps {
    admin: boolean;
}

export const NavBar: React.FC<IProps> = ({ admin }) => {
    const [currentItem, setCurrentItem] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [textDisplay, setTextDisplay] = useState(false);

    useEffect(() => {
        setCurrentItem(window.location.pathname);
    }, []);

    const expandNavBar = useCallback(() => {
        setExpanded(expanded => !expanded);
        if (!textDisplay) {
            setTimeout(() => setTextDisplay(true), 300);
        } else {
            setTextDisplay(false);
        }
    }, [textDisplay, setTextDisplay]);

    const onItemClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
            setCurrentItem(e.currentTarget.getAttribute('href')!),
        [setCurrentItem]
    );

    return (
        <React.Fragment>
            <div
                className={`nav-bar__placeholder ${
                    expanded ? 'nav-bar__placeholder--expanded' : ''
                }`}
            />
            <nav className={`nav-bar ${expanded && 'nav-bar--expanded'}`}>
                {admin && (
                    <NavigationItem
                        active={currentItem.includes(routes.adminPannel)}
                        activeText={textDisplay}
                        icon='infinite'
                        onClick={onItemClick}
                        path={routes.adminPannel}
                        text='Admin Pannel'
                    />
                )}
                <NavigationItem
                    active={currentItem.includes(routes.chat)}
                    activeText={textDisplay}
                    icon='chat'
                    onClick={onItemClick}
                    path={routes.chat}
                    text='Chat'
                />
                <NavigationItem
                    active={currentItem.includes(routes.teams)}
                    activeText={textDisplay}
                    icon='teams'
                    onClick={onItemClick}
                    path={routes.teams}
                    text='Teams management'
                />
                <NavigationItem
                    active={currentItem.includes(routes.settingsProfile)}
                    activeText={textDisplay}
                    icon='settings'
                    onClick={onItemClick}
                    path={routes.settingsProfile}
                    text='Settings'
                />
                <NavigationItem
                    active={currentItem.includes(routes.feed)}
                    activeText={textDisplay}
                    icon='trends'
                    onClick={onItemClick}
                    path={routes.feed}
                    text='Feed'
                />
                <NavigationItem
                    active={currentItem.includes(routes.logout)}
                    activeText={textDisplay}
                    icon='exit'
                    onClick={onItemClick}
                    path={routes.logout}
                    text='Logout'
                />
                <button
                    className={`nav-bar__button-expand ${expanded &&
                        'nav-bar__button-expand--expanded'}`}
                    onClick={expandNavBar}
                >
                    <Icon
                        className='nav-bar__button-expand__icon'
                        name='chevron_right'
                    />
                </button>
            </nav>
        </React.Fragment>
    );
};
