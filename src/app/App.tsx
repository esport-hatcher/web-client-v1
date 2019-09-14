import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '@/services/history';
import { routes } from '@/config';
import {
    AdminPannel,
    AuthPage,
    HomePage,
    SettingsPage,
    Logout,
} from '@/screens';

import { Navigation } from '@/layouts';

import { withUserSession } from '@/HOC';

// tslint:disable-next-line: no-import-side-effect
import '@styles/sass/main.scss';

export class _App extends Component {
    render() {
        return (
            <div className='container'>
                <Router history={history}>
                    <Navigation />
                    <div className='container__content'>
                        <Switch>
                            <Route
                                path={routes.home}
                                exact
                                component={HomePage}
                            />
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
                                render={props => <SettingsPage />}
                            />
                            <Route
                                path={routes.logout}
                                exact
                                render={props => <Logout />}
                            />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export const App = withUserSession(_App);
