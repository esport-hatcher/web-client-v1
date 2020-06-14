import React, { useEffect, useState } from 'react';
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

const getContent = (loginMode: boolean): IBannerContent => {
    if (loginMode) {
        return {
            header: 'Hello, Friend !',
            subHeader: 'Create an account and join the adventure !',
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

export const AuthBanner: React.FC<IProps> = React.memo(
    ({ loginMode, onButtonClick }) => {
        const [content, setContent] = useState<IBannerContent>(() =>
            getContent(loginMode)
        );

        useEffect(() => {
            setContent(() => getContent(loginMode));
        }, [loginMode]);

        return (
            <section className='banner'>
                <div className='banner__container'>
                    <div className='banner__container__title title title--xl'>
                        {content.header}
                    </div>
                    <div className='banner__container__sub-title title title--xs'>
                        {content.subHeader}
                    </div>
                    <Link
                        to={loginMode ? '/register' : '/login'}
                        onClick={onButtonClick}
                        className='btn btn--outline btn--white banner__container__button'
                    >
                        {content.button.toUpperCase()}
                    </Link>
                </div>
            </section>
        );
    }
);
