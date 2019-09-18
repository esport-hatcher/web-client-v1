import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    onButtonClick: () => void;
    loginMode: boolean;
}

export const AuthBanner: React.FC<IProps> = ({ loginMode, onButtonClick }) => {
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
        <section className='banner'>
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
        </section>
    );
};
