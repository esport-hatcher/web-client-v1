import React from 'react';
import { useLocation, matchPath, useHistory } from 'react-router-dom';
import cx from 'classnames';
import { AnimatedRoute } from 'react-router-transition';
import { IRouteConfig } from 'app/config';

interface IProps {
    route: IRouteConfig;
    className?: string;
}

export const LinkDrawer: React.FC<IProps> = React.memo(
    ({ route, className }) => {
        const location = useLocation();
        const history = useHistory();

        return (
            <>
                <AnimatedRoute
                    path={route.path}
                    component={route.Component}
                    atEnter={{ offset: 100 }}
                    atLeave={{ offset: 100 }}
                    atActive={{ offset: 0 }}
                    mapStyles={styles => ({
                        transform: `translateX(${styles.offset}%)`,
                    })}
                    className={cx('link-drawer', className, {
                        'link-drawer--active': matchPath(
                            location.pathname,
                            route.path
                        ),
                    })}
                />
                {matchPath(location.pathname, route.path) && (
                    <div
                        className='link-drawer__overlay'
                        onClick={() => history.goBack()}
                    />
                )}
            </>
        );
    }
);
