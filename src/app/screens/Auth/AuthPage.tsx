import React, { Component } from 'react';
import history from '@/services/history';
import { AuthBanner, AuthForm } from '@/layouts';

interface IAuthPageP {
    isLogin: boolean;
    register?: (
        email: string,
        username: string,
        password: string
    ) => Promise<void>;
    login?: (email: string, password: string) => Promise<void>;
}

export class _AuthPage extends Component<IAuthPageP> {
    state = { loginMode: this.props.isLogin };

    checkIt = () => {
        if (!this.state.loginMode === false) {
            history.push('/register');
        } else {
            history.push('/login');
        }
        this.setState({ loginMode: !this.state.loginMode });
    };

    renderForm = () => {
        if (this.props.login && this.props.register) {
            return (
                <AuthForm
                    loginMode={this.state.loginMode}
                    onLogin={this.props.login}
                    onRegister={this.props.register}
                />
            );
        }
        return null;
    };

    render() {
        return (
            <div className='auth-screen'>
                <input
                    type='checkbox'
                    name='slider'
                    className='auth-screen__checkbox'
                    checked={this.state.loginMode}
                    // tslint:disable-next-line: no-empty
                    onChange={() => {}}
                />
                <div className='auth-screen__banner'>
                    <AuthBanner
                        onButtonClick={this.checkIt}
                        loginMode={this.state.loginMode}
                    />
                </div>
                <div className='auth-screen__form'>{this.renderForm()}</div>
            </div>
        );
    }
}
