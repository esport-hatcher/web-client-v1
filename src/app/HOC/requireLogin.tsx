import React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import { Redirect } from 'react-router';

// tslint:disable-next-line: no-any
export const requireLogin = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        if (!props.token) {
            return (
                <Redirect
                    to={{ pathname: '/login', state: { from: props.location } }}
                />
            );
        }
        return <ChildComponent {...props} />;
    };
    return connect(mapStateToProps)(ComposedComponent);
};

const mapStateToProps = (state: IStoreState) => {
    return {
        token: state.authentication.token,
    };
};
