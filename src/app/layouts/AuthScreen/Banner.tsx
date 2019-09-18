import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    onButtonClick: () => void;
    loginMode: boolean;
}

interface IBannerContent {
    header: string;
    subHeader: string;
    button: string;
}

export const AuthBanner: React.FC<IProps> = React.memo(
    ({ loginMode, onButtonClick }) => {
        const getContent = useCallback(() => {
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
        }, [loginMode]);

        const [content, setContent] = useState<IBannerContent>(getContent);

        useEffect(() => {
            setContent(getContent);
        }, [loginMode, getContent]);

        return (
            <section className='banner'>
                <div className='banner__container'>
                    <div className='banner__container__title title title--big'>
                        {content.header}
                    </div>
                    <div className='banner__container__sub-title title title--xs'>
                        {content.subHeader}
                    </div>
                    <Link
                        to={loginMode ? '/register' : '/login'}
                        onClick={onButtonClick}
                        className='btn btn--outline btn--white'
                    >
                        {content.button.toUpperCase()}
                    </Link>
                </div>
            </section>
        );
    }
);
