import React from 'react';
import cx from 'classnames';
import { AuthBanner, RegisterForm, LoginForm } from 'app/layouts';
import { useToggler } from 'app/custom-hooks';
import { routesPath } from 'app/config';
import { RouteComponentProps } from 'react-router-dom';

interface IProps {}

export const _AuthPage: React.FC<IProps & RouteComponentProps> = React.memo(
    ({ location }) => {
        const { pathname } = location;
        const [loginMode, toggleLoginMode] = useToggler(
            pathname === routesPath.login
        );

        const renderForm = (): JSX.Element => {
            if (loginMode) {
                return <LoginForm />;
            }
            return <RegisterForm />;
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
    }
);
