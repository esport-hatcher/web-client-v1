import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { routesPath } from 'app/config';
import { useSelector } from 'app/custom-hooks';

export const requireAnonyme = <T extends {}>(ChildComponent: React.FC<T>) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = React.memo((props: any) => {
        const token = useSelector(state => state.authentication.token);

        if (token) {
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
