import React, { Component } from 'react';
import { NavBar } from './Navigation';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import { IUser } from '@/actions';

interface IRNavigationP {
    user?: IUser;
}

class RNavigation extends Component<IRNavigationP> {
    render() {
        const { user } = this.props;

        if (user) {
            return <NavBar admin={user.superAdmin} />;
        }
        return null;
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        user: state.authentication.user,
    };
};

export const Navigation = connect(mapStateToProps)(RNavigation);
