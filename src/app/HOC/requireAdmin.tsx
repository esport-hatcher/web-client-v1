import React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import { Redirect } from 'react-router-dom';

// tslint:disable-next-line: no-any
export const requireAdmin = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        if (!props.user || !props.user.superAdmin) {
            return (
                <Redirect
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            );
        }
        return <ChildComponent {...props} />;
    };
    return connect(mapStateToProps)(ComposedComponent);
};

const mapStateToProps = (state: IStoreState) => {
    return {
        user: state.authentication.user,
    };
};
