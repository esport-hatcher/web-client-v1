import React from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { ToastContainer } from 'react-toastify';
import { IconContext } from 'react-icons/lib';
import { Navigation } from 'app/layouts';
import {
    routes,
    BASE_ICON_CLASS,
    TOAST_DURATION,
    IRouteConfig,
} from 'app/config';
// tslint:disable no-import-side-effect
import 'react-toastify/dist/ReactToastify.css';
import 'styles/sass/main.scss';

const RouteWithSubroutes = (route: IRouteConfig) => {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.Component {...props} routes={route.routes} />
            )}
        />
    );
};

export const App: React.FC = () => {
    return (
        <IconContext.Provider value={{ className: BASE_ICON_CLASS }}>
            <div className='container'>
                <Navigation />
                <div className='container__content'>
                    <ToastContainer
                        autoClose={TOAST_DURATION}
                        position='top-center'
                    />
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className='switch-wrapper'
                    >
                        {routes.map((route, i) => (
                            <RouteWithSubroutes key={i} {...route} />
                        ))}
                    </AnimatedSwitch>
                </div>
            </div>
        </IconContext.Provider>
    );
};
