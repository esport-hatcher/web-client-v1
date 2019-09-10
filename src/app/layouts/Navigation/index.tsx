import React, { Component } from 'react';
import { NavBar } from './Navigation';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';

interface IRNavigationP {
    auth?: string;
}

class RNavigation extends Component<IRNavigationP> {
    render() {
        const { auth } = this.props;

        if (auth) {
            return <NavBar />;
        }
        return null;
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        auth: state.authentication.token,
    };
};

export const Navigation = connect(mapStateToProps)(RNavigation);
