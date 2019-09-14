import React, { Component } from 'react';
import { routes } from '@/config';
import { NavigationItem, Icon } from '@/components';

interface INavBarProps {
    admin: boolean;
}
export class NavBar extends Component<INavBarProps> {
    state = { expanded: false, textDisplay: false, currentItem: '' };

    componentDidMount() {
        this.setState({ currentItem: window.location.pathname });
    }

    expandNavBar = () => {
        const { textDisplay } = this.state;

        this.setState({ expanded: !this.state.expanded });
        if (!textDisplay) {
            setTimeout(() => this.setState({ textDisplay: true }), 300);
        } else {
            this.setState({ textDisplay: false });
        }
    };

    // tslint:disable-next-line: no-any
    onItemClick = (e: any) => {
        this.setState({ currentItem: e.currentTarget.getAttribute('href') });
    };

    render() {
        const { expanded, textDisplay, currentItem } = this.state;
        const { admin } = this.props;

        return (
            <React.Fragment>
                <div
                    className={`nav-bar__placeholder ${
                        expanded ? 'nav-bar__placeholder--expanded' : ''
                    }`}
                />
                <nav
                    className={`nav-bar ${expanded ? 'nav-bar--expanded' : ''}`}
                >
                    {admin ? (
                        <NavigationItem
                            active={currentItem.includes(routes.adminPannel)}
                            activeText={textDisplay}
                            icon='infinite'
                            onClick={this.onItemClick}
                            path={routes.adminPannel}
                            text='Admin Pannel'
                        />
                    ) : null}
                    <NavigationItem
                        active={currentItem.includes(routes.chat)}
                        activeText={textDisplay}
                        icon='chat'
                        onClick={this.onItemClick}
                        path={routes.chat}
                        text='Chat'
                    />
                    <NavigationItem
                        active={currentItem.includes(routes.settings)}
                        activeText={textDisplay}
                        icon='settings'
                        onClick={this.onItemClick}
                        path={routes.settings}
                        text='Settings'
                    />
                    <NavigationItem
                        active={currentItem.includes(routes.feed)}
                        activeText={textDisplay}
                        icon='trends'
                        onClick={this.onItemClick}
                        path={routes.feed}
                        text='Feed'
                    />
                    <NavigationItem
                        active={currentItem.includes(routes.logout)}
                        activeText={textDisplay}
                        icon='exit'
                        onClick={this.onItemClick}
                        path={routes.logout}
                        text='Logout'
                    />
                    <button
                        className={`nav-bar__button-expand ${
                            expanded ? 'nav-bar__button-expand--expanded' : ''
                        }`}
                        onClick={this.expandNavBar}
                    >
                        <Icon
                            className='nav-bar__button-expand__icon'
                            name='chevron_right'
                        />
                    </button>
                </nav>
            </React.Fragment>
        );
    }
}
