import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface IAuthBannerP {
    onButtonClick: () => void;
    loginMode: boolean;
}

export class AuthBanner extends Component<IAuthBannerP> {
    getContent = () => {
        const { loginMode } = this.props;

        if (loginMode) {
            return {
                header: 'Hello, Friend !',
                subHeader:
                    'Enter your personal infos and start your journey with us !',
                button: 'Sign up',
            };
        }
        return {
            header: 'Welcome Back !',
            subHeader:
                'Enter your account credentials and start your journey with us !',
            button: 'Sign in',
        };
    };

    render() {
        const bodyText = this.getContent();
        const { loginMode } = this.props;

        return (
            <div className='banner'>
                <div className='banner__container'>
                    <div className='banner__container__title title title--big'>
                        {bodyText.header}
                    </div>
                    <div className='banner__container__sub-title title title--xs'>
                        {bodyText.subHeader}
                    </div>
                    <Link
                        to={loginMode ? '/register' : '/login'}
                        onClick={this.props.onButtonClick}
                        className='btn btn--outline btn--white'
                    >
                        {bodyText.button.toUpperCase()}
                    </Link>
                </div>
            </div>
        );
    }
}
