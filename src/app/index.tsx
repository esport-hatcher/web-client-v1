import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import { IconContext } from 'react-icons/lib';
import { Navigation } from 'app/layouts';
import {
    routes,
    SCREEN_TRANSITION_MS,
    BASE_ICON_CLASS,
    TOAST_DURATION,
} from 'app/config';
// tslint:disable no-import-side-effect
import 'react-toastify/dist/ReactToastify.css';
import 'styles/sass/main.scss';

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
                    {routes.map(({ path, Component }) => (
                        <Route key={path} exact path={path}>
                            {({ match }) => (
                                <CSSTransition
                                    in={match != null}
                                    timeout={SCREEN_TRANSITION_MS}
                                    classNames='router-transition'
                                    unmountOnExit
                                >
                                    <div className='router-transition__container'>
                                        <Component />
                                    </div>
                                </CSSTransition>
                            )}
                        </Route>
                    ))}
                </div>
            </div>
        </IconContext.Provider>
    );
};
