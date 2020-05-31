import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { IconContext } from 'react-icons/lib';
import { Navigation } from 'app/layouts';
import { routes, SCREEN_TRANSITION_MS, BASE_ICON_CLASS } from 'app/config';
// tslint:disable-next-line: no-import-side-effect
import 'styles/sass/main.scss';

export const App: React.FC = () => {
    return (
        <IconContext.Provider value={{ className: BASE_ICON_CLASS }}>
            <div className='container'>
                <Navigation />
                <div className='container__content'>
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
