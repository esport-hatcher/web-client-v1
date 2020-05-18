import React from 'react';
import cx from 'classnames';
import { AuthBanner, RegisterForm, LoginForm } from 'app/layouts';
import { useToggler, useSelector } from 'app/custom-hooks';
import { routesPath } from 'app/config';

interface IProps {
    isLogin: boolean;
    // tslint:disable-next-line: no-any
    location: any;
}

export const _AuthPage: React.FC<IProps> = React.memo(({ location }) => {
    const { pathname } = location;
    const [loginMode, toggleLoginMode] = useToggler(
        pathname === routesPath.login
    );
    const errorMsg = useSelector(state => state.authentication.errorMsg);

    const renderForm = (): JSX.Element => {
        if (loginMode) {
            return <LoginForm errorMsg={errorMsg} />;
        }
        return <RegisterForm errorMsg={errorMsg} />;
    };

    return (
        <main className='auth-screen'>
            <div
                className={cx('auth-screen__banner', {
                    'auth-screen__banner--login': loginMode,
                })}
            >
                <AuthBanner
                    onButtonClick={toggleLoginMode}
                    loginMode={loginMode}
                />
            </div>
            <div
                className={cx('auth-screen__form', {
                    'auth-screen__form--login': loginMode,
                })}
            >
                {renderForm()}
            </div>
        </main>
    );
});
