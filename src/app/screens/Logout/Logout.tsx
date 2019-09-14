import React, { Component } from 'react';
import { logout } from '@/actions';
import history from '@/services/history';

interface ILogoutProps {
    logout: typeof logout;
}

export class _Logout extends Component<ILogoutProps> {
    componentDidMount() {
        const { logout } = this.props;
        logout();
        history.push('/login');
    }
    render() {
        return <div>Bye</div>;
    }
}
