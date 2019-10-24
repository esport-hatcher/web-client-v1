import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from '@/config';
import { AdminPannel, AuthPage, HomePage, Logout } from '@/screens';

import { Navigation } from '@/layouts';

// tslint:disable-next-line: no-import-side-effect
import '@styles/sass/main.scss';
import { SettingsProfile } from './screens/Settings/Profile';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className='container'>
                <Navigation />
                <div className='container__content'>
                    <Switch>
                        <Route path={routes.home} exact component={HomePage} />
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
                            path={routes.settingsProfile}
                            exact
                            component={SettingsProfile}
                        />
                        <Route path={routes.logout} exact component={Logout} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};
