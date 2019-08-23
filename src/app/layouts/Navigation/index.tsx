import React, { Component } from 'react';
import { Navigation } from './Navigation';
import { connect } from 'react-redux';
import { IState } from 'src/typings/states/global';

interface IRNavigationP {
    auth?: string;
    expandGridSidebar: () => void;
}

class RNavigation extends Component<IRNavigationP> {
    render() {
        const { auth, expandGridSidebar } = this.props;

        if (auth) {
            return <Navigation expandGridSidebar={expandGridSidebar} />;
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
