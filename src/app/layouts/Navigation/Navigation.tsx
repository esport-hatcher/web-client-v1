import React, { useState, useCallback } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import {
    AiOutlineTool,
    AiOutlineMail,
    AiOutlineTeam,
    AiOutlineSetting,
    AiOutlineFire,
    AiOutlineLogout,
} from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import cx from 'classnames';
import { routesPath } from 'app/config';
import { NavigationItem } from 'app/components';

interface IProps {
    admin: boolean;
}

export const NavBar: React.FC<IProps> = React.memo(({ admin }) => {
    const [expanded, setExpanded] = useState(false);
    const [textDisplay, setTextDisplay] = useState(false);

    const expandNavBar = useCallback(() => {
        setExpanded(expanded => !expanded);
        if (!textDisplay) {
            setTimeout(() => setTextDisplay(true), 300);
        } else {
            setTextDisplay(false);
        }
    }, [textDisplay, setTextDisplay]);

    return (
        <React.Fragment>
            <div
                className={cx('nav-bar__placeholder', {
                    'nav-bar__placeholder--expanded': expanded,
                })}
            />
            <nav className={cx('nav-bar', { 'nav-bar--expanded': expanded })}>
                {admin && (
                    <NavigationItem
                        activeText={textDisplay}
                        Icon={AiOutlineTool}
                        path={routesPath.adminPanel}
                        text='Admin Panel'
                    />
                )}
                <NavigationItem
                    activeText={textDisplay}
                    Icon={AiOutlineFire}
                    path={routesPath.feed}
                    text='Feed'
                />
                <NavigationItem
                    activeText={textDisplay}
                    Icon={AiOutlineMail}
                    path={routesPath.chat}
                    text='Chat'
                />
                <NavigationItem
                    activeText={textDisplay}
                    Icon={AiOutlineTeam}
                    path={routesPath.teams}
                    text='Teams management'
                />
                <NavigationItem
                    activeText={textDisplay}
                    Icon={FaTasks}
                    path={routesPath.todolist}
                    text='To-do List'
                />
                <NavigationItem
                    activeText={textDisplay}
                    Icon={AiOutlineSetting}
                    path={routesPath.settingsProfile}
                    text='Settings'
                />
                <NavigationItem
                    activeText={textDisplay}
                    Icon={AiOutlineLogout}
                    path={routesPath.logout}
                    text='Logout'
                />
                <button
                    className={cx('nav-bar__button-expand', {
                        'nav-bar__button-expand--expanded': expanded,
                    })}
                    onClick={expandNavBar}
                >
                    <FiChevronRight className='nav-bar__button-expand__icon' />
                </button>
            </nav>
        </React.Fragment>
    );
});
