import React from 'react';
import { Link } from 'react-router-dom';

interface IAuthBannerProps {
    onButtonClick: () => void;
    loginMode: boolean;
}

export const AuthBanner = ({
    loginMode,
    onButtonClick,
}: IAuthBannerProps): JSX.Element => {
    const getContent = () => {
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

    const bodyText = getContent();

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
                    onClick={onButtonClick}
                    className='btn btn--outline btn--white'
                >
                    {bodyText.button.toUpperCase()}
                </Link>
            </div>
        </div>
    );
};
