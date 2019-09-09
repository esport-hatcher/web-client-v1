import React, { Component } from 'react';
import { Navigation } from './Navigation';
import { connect } from 'react-redux';
import { IState } from 'src/typings/states/global';

interface IRNavigationP {
    auth?: string;
}

class RNavigation extends Component<IRNavigationP> {
    render() {
        const { auth } = this.props;

        if (auth) {
            return <Navigation />;
        }
        return null;
    }
}

const mapStateToProps = (state: IState) => {
    return {
        auth: state.auth.token,
    };
};
export default connect(mapStateToProps)(RNavigation);
