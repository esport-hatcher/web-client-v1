import React, { Component } from 'react';
import history from '@/services/history';
import { AuthBanner, RegisterForm, LoginForm } from '@/layouts';

interface IAuthPageProps {
    isLogin: boolean;
    errorMsg?: string;
    register: (
        email: string,
        username: string,
        password: string
    ) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
}

export class _AuthPage extends Component<IAuthPageProps> {
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
        const { loginMode } = this.state;
        const { errorMsg, login, register } = this.props;

        if (loginMode) {
            return <LoginForm errorMsg={errorMsg} onLogin={login} />;
        }
        return <RegisterForm errorMsg={errorMsg} onRegister={register} />;
    };

    render() {
        return (
            <div className='auth-screen'>
                <input
                    type='checkbox'
                    name='slider'
                    className='auth-screen__checkbox'
                    checked={this.state.loginMode}
                    onChange={() => null}
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
