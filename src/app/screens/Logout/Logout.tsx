import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '@/actions';

interface ILogoutProps {
    logout: typeof logout;
}

export class _Logout extends Component<ILogoutProps> {
    componentDidMount() {
        const { logout } = this.props;
        logout();
    }
    render() {
        return <Redirect to='/login' />;
    }
}
