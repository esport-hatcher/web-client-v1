import {
    AuthPage,
    AdminPanel,
    HomePage,
    TeamPage,
    EditTeamPage,
    Logout,
    CalendarPage,
} from 'app/screens';
import { SettingsProfile } from 'app/screens/Settings';

export enum routesPath {
    home = '/',
    login = '/login',
    register = '/register',
    adminPanel = '/admin',
    logout = '/logout',
    teams = '/teams',
    teamsDetail = '/team/:id',
    calendar = '/calendar',
    settingsProfile = '/settings/profile',
}

export interface IRouteConfig {
    path: routesPath;
    // tslint:disable-next-line: no-any
    Component: any;
    exact: boolean;
    routes?: IRouteConfig[];
}
export const routes: IRouteConfig[] = [
    {
        path: routesPath.login,
        Component: AuthPage,
        exact: true,
    },
    {
        path: routesPath.register,
        Component: AuthPage,
        exact: true,
    },
    {
        path: routesPath.logout,
        Component: Logout,
        exact: true,
    },
    {
        path: routesPath.home,
        Component: HomePage,
        exact: true,
    },
    {
        path: routesPath.settingsProfile,
        Component: SettingsProfile,
        exact: true,
    },
    {
        path: routesPath.teams,
        Component: TeamPage,
        exact: true,
    },
    {
        path: routesPath.teamsDetail,
        Component: EditTeamPage,
        exact: false,
    },
    {
        path: routesPath.adminPanel,
        Component: AdminPanel,
        exact: true,
    },
    {
        path: routesPath.calendar,
        Component: CalendarPage,
        exact: true,
    },
];
