import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import { fetchUserSession } from '@/actions/authentication';

/**
 * The component wrapped will look each times it's render if their is a property authentication.token present and no user associated.
 * If their is no user but a token, it will fetch the user and store it in Redux
 */
// tslint:disable-next-line: no-any
export const withUserSession = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        useEffect(() => {
            if (!props.authentication.user && props.authentication.token) {
                props.fetchUserSession();
            }
        });
        return <ChildComponent {...props} />;
    };
    return connect(
        mapStateToProps,
        { fetchUserSession }
    )(ComposedComponent);
};

const mapStateToProps = (state: IStoreState) => {
    return {
        authentication: state.authentication,
    };
};
