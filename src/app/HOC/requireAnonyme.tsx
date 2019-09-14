import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import history from '@/services/history';

// tslint:disable-next-line: no-any
export const requireAnonyme = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        useEffect(() => {
            if (props.user) {
                if (props.user.superAdmin) {
                    return history.push('/admin/pannel');
                }
                return history.push('/chat');
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
