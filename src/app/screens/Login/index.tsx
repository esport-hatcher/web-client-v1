import React, { Component } from 'react';
import AuthBanner from '@/layouts/AuthScreen/Banner';
import AuthForm from '@/layouts/AuthScreen/Form';

export class LoginPage extends Component {
    state = { loginMode: false };

    checkIt = () => this.setState({ loginMode: !this.state.loginMode });

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
                <div className='auth-screen__form'>
                    <AuthForm loginMode={this.state.loginMode} />
                </div>
            </div>
        );
    }
}

export default LoginPage;
