import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { routes } from '@/config';
import { useSelector } from '@/custom-hooks';

export const requireAnonyme = <T extends {}>(ChildComponent: React.FC<T>) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        const user = useSelector(
            state => state.authentication.user,
            shallowEqual
        );

        if (user) {
            if (user.superAdmin) {
                return (
                    <Redirect
                        to={{
                            pathname: props.location.state
                                ? props.location.state.from.pathname
                                : routes.adminPannel,
                            state: { from: props.location },
                        }}
                    />
                );
            }
            return (
                <Redirect
                    to={{
                        pathname: props.location.state
                            ? props.location.state.from.pathname
                            : routes.home,
                        state: { from: props.location },
                    }}
                />
            );
        }
        return <ChildComponent {...props} />;
    };
    return ComposedComponent;
};
