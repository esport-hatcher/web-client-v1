import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useSelector } from 'app/custom-hooks';
import { routesPath } from 'app/config';

export const requireAdmin = <T extends {}>(ChildComponent: React.FC<T>) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        const user = useSelector(
            state => state.authentication.user,
            shallowEqual
        );

        if (!user || !user.superAdmin) {
            return (
                <Redirect
                    to={{
                        pathname: routesPath.home,
                        state: { from: props.location },
                    }}
                />
            );
        }
        return <ChildComponent {...props} />;
    };
    return withRouter(ComposedComponent);
};
