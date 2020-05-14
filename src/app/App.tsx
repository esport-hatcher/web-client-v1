import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from 'app/config';
// tslint:disable-next-line: no-import-side-effect
import 'styles/sass/main.scss';

const AdminPannel = lazy(() =>
    import('./screens').then(module => ({
        default: module.AdminPannel,
    }))
);

const EditTeamPage = lazy(() =>
    import('./screens').then(module => ({
        default: module.EditTeamPage,
    }))
);

const HomePage = lazy(() =>
    import('./screens').then(module => ({
        default: module.HomePage,
    }))
);

const TeamPage = lazy(() =>
    import('./screens').then(module => ({
        default: module.TeamPage,
    }))
);

const AuthPage = lazy(() =>
    import('./screens').then(module => ({
        default: module.AuthPage,
    }))
);

const SettingsProfile = lazy(() =>
    import('./screens').then(module => ({
        default: module.SettingsProfile,
    }))
);

const Logout = lazy(() =>
    import('./screens').then(module => ({
        default: module.Logout,
    }))
);

const Navigation = React.lazy(() =>
    import('./layouts').then(module => ({
        default: module.Navigation,
    }))
);

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className='container'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Navigation />
                    <div className='container__content'>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Switch>
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
                        </Suspense>
                    </div>
                </Suspense>
            </div>
        </BrowserRouter>
    );
};
