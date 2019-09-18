import React from 'react';
import { AuthBanner, RegisterForm, LoginForm } from '@/layouts';
import { useToggler } from '@/custom-hooks';
import {
    registerFormFill,
    IRegisterForm,
    IRegisterProps,
    RegisterFormStages,
    registerFormSetStage,
} from '@/actions';

interface IProps {
    isLogin: boolean;
    errorMsg?: string;
    registerFormFill: typeof registerFormFill;
    fields: IRegisterProps;
    register: (registerProps: IRegisterForm) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    setStage: typeof registerFormSetStage;
    stage: RegisterFormStages;
}

export const isStageMore = (stage: RegisterFormStages) =>
    stage === RegisterFormStages.more;

export const _AuthPage: React.FC<IProps> = ({
    isLogin,
    errorMsg,
    registerFormFill,
    fields,
    register,
    login,
    setStage,
    stage,
}) => {
    const [loginMode, setLoginMode] = useToggler(isLogin);

    const renderForm = (): JSX.Element => {
        if (loginMode) {
            return <LoginForm errorMsg={errorMsg} onLogin={login} />;
        }
        return (
            <RegisterForm
                errorMsg={errorMsg}
                setStage={setStage}
                stage={stage}
                onSubmit={register}
                onChangeFields={registerFormFill}
                fields={fields}
            />
        );
    };

    return (
        <main className='auth-screen'>
            <div
                className={`auth-screen__banner ${
                    loginMode ? 'auth-screen__banner--login' : ''
                } ${isStageMore(stage) ? 'auth-screen__banner--register' : ''}`}
            >
                <AuthBanner
                    onButtonClick={setLoginMode}
                    loginMode={loginMode}
                />
            </div>
            <div
                className={`auth-screen__form ${
                    loginMode ? 'auth-screen__form--login' : ''
                } ${isStageMore(stage) ? 'auth-screen__form--register' : ''}`}
            >
                {renderForm()}
            </div>
        </main>
    );
};
