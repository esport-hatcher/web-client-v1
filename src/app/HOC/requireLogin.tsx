import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import history from '@/services/history';

// tslint:disable-next-line: no-any
export const requireLogin = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        useEffect(() => {
            if (!props.token) {
                history.push('/login');
            }
        }, [props.token]);
        return <ChildComponent {...props} />;
    };
    return connect(mapStateToProps)(ComposedComponent);
};

const mapStateToProps = (state: IStoreState) => {
    return {
        token: state.authentication.token,
    };
};
