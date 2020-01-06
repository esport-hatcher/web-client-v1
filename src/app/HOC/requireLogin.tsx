import React from 'react';
import { Redirect, withRouter } from 'react-router';
import { useSelector } from '@/custom-hooks';

// tslint:disable-next-line: no-any
export const requireLogin = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        const token = useSelector(state => state.authentication.token);
        if (!token) {
            return (
                <Redirect
                    to={{ pathname: '/login', state: { from: props.location } }}
                />
            );
        }
        return <ChildComponent {...props} />;
    };
    return withRouter(ComposedComponent);
};
