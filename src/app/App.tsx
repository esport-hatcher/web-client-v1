import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Navigation } from 'app/layouts';
import { routes, SCREEN_TRANSITION_MS } from 'app/config';
// tslint:disable-next-line: no-import-side-effect
import 'styles/sass/main.scss';

export const App: React.FC = () => {
    return (
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
    );
};
