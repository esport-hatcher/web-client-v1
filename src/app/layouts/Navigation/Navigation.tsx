import React, { Component } from 'react';
// tslint:disable-next-line: match-default-export-name
import sprites from '../../../assets/sprite.svg';
import routes from '@/config/routes';
import NavigationItem from '@/components/NavigationItem/index';

interface INavigationP {
    expandGridSidebar: () => void;
}

export class Navigation extends Component<INavigationP> {
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

    onExpandSideBarClick = () => {
        const { expandGridSidebar } = this.props;
        this.expandNavBar();
        expandGridSidebar();
    };

    // tslint:disable-next-line: no-any
    onItemClick = (e: any) => {
        this.setState({ currentItem: e.currentTarget.getAttribute('href') });
    };

    render() {
        const { expanded, textDisplay, currentItem } = this.state;

        return (
            <React.Fragment>
                <nav
                    className={`nav-bar ${expanded ? 'nav-bar--expanded' : ''}`}
                >
                    <NavigationItem
                        active={currentItem.includes(routes.adminPannel)}
                        activeText={textDisplay}
                        icon='infinite'
                        onClick={this.onItemClick}
                        path={routes.adminPannel}
                        text='Admin Pannel'
                    />
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
                    <button
                        className={`nav-bar__button-expand ${
                            expanded ? 'nav-bar__button-expand--expanded' : ''
                        }`}
                        onClick={this.onExpandSideBarClick}
                    >
                        <svg className='nav-bar__button-expand__icon'>
                            <use xlinkHref={`${sprites}#icon-chevron-right`} />
                        </svg>
                    </button>
                </nav>
            </React.Fragment>
        );
    }
}

export default Navigation;
