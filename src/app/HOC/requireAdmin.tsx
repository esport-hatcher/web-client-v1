import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useSelector } from '@/custom-hooks';

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
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            );
        }
        return <ChildComponent {...props} />;
    };
    return ComposedComponent;
};
