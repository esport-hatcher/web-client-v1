import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from 'app/config';
import { NavigationItem } from 'app/components';

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
                        icon='tools'
                        onClick={onItemClick}
                        path={routes.adminPannel}
                        text='Admin Pannel'
                    />
                )}
                <NavigationItem
                    active={currentItem.includes(routes.chat)}
                    activeText={textDisplay}
                    icon='envelope'
                    onClick={onItemClick}
                    path={routes.chat}
                    text='Chat'
                />
                <NavigationItem
                    active={currentItem.includes(routes.teams)}
                    activeText={textDisplay}
                    icon='users'
                    onClick={onItemClick}
                    path={routes.teams}
                    text='Teams management'
                />
                <NavigationItem
                    active={currentItem.includes(routes.settingsProfile)}
                    activeText={textDisplay}
                    icon='cog'
                    onClick={onItemClick}
                    path={routes.settingsProfile}
                    text='Settings'
                />
                <NavigationItem
                    active={currentItem.includes(routes.feed)}
                    activeText={textDisplay}
                    icon='poll'
                    onClick={onItemClick}
                    path={routes.feed}
                    text='Feed'
                />
                <NavigationItem
                    active={currentItem.includes(routes.logout)}
                    activeText={textDisplay}
                    icon='sign-out-alt'
                    onClick={onItemClick}
                    path={routes.logout}
                    text='Logout'
                />
                <button
                    className={`nav-bar__button-expand ${expanded &&
                        'nav-bar__button-expand--expanded'}`}
                    onClick={expandNavBar}
                >
                    <FontAwesomeIcon
                        className='nav-bar__button-expand__icon'
                        icon='chevron-right'
                    />
                </button>
            </nav>
        </React.Fragment>
    );
};
