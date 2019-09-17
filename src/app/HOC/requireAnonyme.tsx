import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import { routes } from '@/config';

// tslint:disable-next-line: no-any
export const requireAnonyme = (ChildComponent: any) => {
    // tslint:disable-next-line: no-any
    const ComposedComponent = (props: any) => {
        if (props.user) {
            if (props.user.superAdmin) {
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
    return connect(mapStateToProps)(ComposedComponent);
};

const mapStateToProps = (state: IStoreState) => {
    return {
        user: state.authentication.user,
    };
};
