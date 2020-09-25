import { IRouteConfig } from 'app/config';
import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import cx from 'classnames';
import { AnimatedRoute } from 'react-router-transition';

interface IProps {
    route: IRouteConfig;
}

export const LinkDrawer: React.FC<IProps> = ({ route }) => {
    const location = useLocation();

    return (
        <AnimatedRoute
            path={route.path}
            component={route.Component}
            atEnter={{ offset: 100 }}
            atLeave={{ offset: 100 }}
            atActive={{ offset: 0 }}
            mapStyles={styles => ({
                transform: `translateX(${styles.offset}%)`,
            })}
            className={cx('link-drawer', {
                'link-drawer--active': matchPath(location.pathname, route.path),
            })}
        />
    );
};
