import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '@/services/history';

import routes from '@/config/routes';
import HomePage from '@/screens/Home';
import AuthPage from '@/screens/Auth';
import AdminPannel from '@/screens/Admin/Pannel';
import Settings from '@/screens/Settings';
import Navigation from '@/layouts/Navigation';

// tslint:disable-next-line: no-import-side-effect
import '@styles/sass/main.scss';

export class App extends Component {
    state = { sidebarExpanded: false };

    expandSidebar = () =>
        this.setState({ sidebarExpanded: !this.state.sidebarExpanded });

    render() {
        const { sidebarExpanded } = this.state;

        return (
            <div
                className={`container ${
                    sidebarExpanded ? 'container--expanded' : ''
                }`}
            >
                <Router history={history}>
                    <Navigation expandGridSidebar={this.expandSidebar} />
                    <Switch>
                        <Route path={routes.home} exact component={HomePage} />
                        <Route
                            path={routes.login}
                            exact
                            render={props => <AuthPage isLogin={true} />}
                        />
                        <Route
                            path={routes.register}
                            exact
                            render={props => <AuthPage isLogin={false} />}
                        />
                        <Route
                            path={routes.adminPannel}
                            exact
                            render={props => <AdminPannel />}
                        />
                        <Route
                            path={routes.settings}
                            exact
                            render={props => <Settings />}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
