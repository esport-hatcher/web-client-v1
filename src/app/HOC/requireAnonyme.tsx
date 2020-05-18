import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { routesPath } from 'app/config';
import { useSelector } from 'app/custom-hooks';

export const requireAnonyme = <T extends {}>(ChildComponent: React.FC<T>) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = React.memo((props: any) => {
        const user = useSelector(
            state => state.authentication.user,
            shallowEqual
        );

        if (user) {
            if (user.superAdmin) {
                return (
                    <Redirect
                        to={{
                            pathname: routesPath.adminPannel,
                        }}
                    />
                );
            }
            return (
                <Redirect
                    to={{
                        pathname: routesPath.home,
                    }}
                />
            );
        }
        return <ChildComponent {...props} />;
    });
    return withRouter(ComposedComponent);
};
