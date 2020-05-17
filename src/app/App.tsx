import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { routes, SCREEN_TRANSITION_MS } from 'app/config';
import {
    AdminPannel,
    AuthPage,
    HomePage,
    Logout,
    TeamPage,
    EditTeamPage,
} from 'app/screens';
// tslint:disable-next-line: no-import-side-effect
import 'styles/sass/main.scss';

import { Navigation } from 'app/layouts';
import { SettingsProfile } from 'app/screens/Settings/Profile';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const App: React.FC = () => {
    const location = useLocation();

    return (
        <div className='container'>
            <Navigation />
            <div className='container__content'>
                <TransitionGroup component={null}>
                    <CSSTransition
                        timeout={SCREEN_TRANSITION_MS}
                        classNames='router-transition'
                        key={location.key}
                    >
                        <div className='router-transition__container'>
                            <Switch location={location}>
                                <Route
                                    path={routes.team}
                                    component={EditTeamPage}
                                />
                                <Route
                                    path={routes.home}
                                    exact
                                    component={HomePage}
                                />
                                <Route
                                    path={routes.teams}
                                    exact
                                    component={TeamPage}
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
                                    path={routes.settingsProfile}
                                    exact
                                    component={SettingsProfile}
                                />
                                <Route
                                    path={routes.logout}
                                    exact
                                    component={Logout}
                                />
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    );
};
