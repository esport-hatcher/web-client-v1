import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
            <BrowserRouter>
                <div className='container'>
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
                                render={props => (
                                    <AuthPage {...props} isLogin={true} />
                                )}
                            />
                            <Route
                                path={routes.register}
                                exact
                                render={props => (
                                    <AuthPage {...props} isLogin={false} />
                                )}
                            />
                            <Route
                                path={routes.adminPannel}
                                exact
                                component={AdminPannel}
                            />
                            <Route
                                path={routes.settings}
                                exact
                                component={SettingsPage}
                            />
                            <Route
                                path={routes.logout}
                                exact
                                component={Logout}
                            />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export const App = withUserSession(_App);
