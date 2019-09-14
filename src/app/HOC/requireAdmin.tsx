import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import history from '@/services/history';

// tslint:disable-next-line: no-any
export const requireAdmin = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        useEffect(() => {
            if (!props.user || !props.user.superAdmin) {
                history.goBack();
            }
        }, [props.user]);
        return <ChildComponent {...props} />;
    };
    return connect(mapStateToProps)(ComposedComponent);
};

const mapStateToProps = (state: IStoreState) => {
    return {
        user: state.authentication.user,
    };
};
