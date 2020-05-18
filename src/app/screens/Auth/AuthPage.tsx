import React from 'react';
import { AuthBanner, RegisterForm, LoginForm } from 'app/layouts';
import { useToggler, useSelector } from 'app/custom-hooks';
import { RegisterFormStages } from 'app/actions';
import { routesPath } from 'app/config';

interface IProps {
    isLogin: boolean;
    // tslint:disable-next-line: no-any
    location: any;
}

export const isStageMore = (stage: RegisterFormStages) =>
    stage === RegisterFormStages.more;

export const _AuthPage: React.FC<IProps> = React.memo(({ location }) => {
    const { pathname } = location;
    const [loginMode, toggleLoginMode] = useToggler(
        pathname === routesPath.login
    );
    const errorMsg = useSelector(state => state.authentication.errorMsg);
    const stage = useSelector(state => state.registerForm.stage);

    const renderForm = (): JSX.Element => {
        if (loginMode) {
            return <LoginForm errorMsg={errorMsg} />;
        }
        return <RegisterForm stage={stage!} errorMsg={errorMsg} />;
    };

    return (
        <main className='auth-screen'>
            <div
                className={`auth-screen__banner ${loginMode &&
                    'auth-screen__banner--login'} ${isStageMore(stage!) &&
                    'auth-screen__banner--register'}`}
            >
                <AuthBanner
                    onButtonClick={toggleLoginMode}
                    loginMode={loginMode}
                />
            </div>
            <div
                className={`auth-screen__form ${loginMode &&
                    'auth-screen__form--login'} ${isStageMore(stage!) &&
                    'auth-screen__form--register'}`}
            >
                {renderForm()}
            </div>
        </main>
    );
});
