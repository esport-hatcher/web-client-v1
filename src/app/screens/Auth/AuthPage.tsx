import React, { Component } from 'react';
import history from '@/services/history';
import { AuthBanner, RegisterForm, LoginForm } from '@/layouts';
import { RegisterFormStages } from '@/layouts/AuthScreen';
import { registerFormFill, IRegisterForm, IRegisterProps } from '@/actions';

interface IAuthPageProps {
    isLogin: boolean;
    errorMsg?: string;
    registerFormFill: typeof registerFormFill;
    fieldsValue: IRegisterProps;
    register: (registerProps: IRegisterForm) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
}

interface IAuthPageState {
    loginMode: boolean;
    registerFormStage: RegisterFormStages;
}

export class _AuthPage extends Component<IAuthPageProps, IAuthPageState> {
    constructor(props: IAuthPageProps) {
        super(props);
        this.state = {
            loginMode: this.props.isLogin,
            registerFormStage: RegisterFormStages.basic,
        };
    }

    checkIt = () => {
        if (!this.state.loginMode === false) {
            history.push('/register');
        } else {
            history.push('/login');
        }
        this.setState({ loginMode: !this.state.loginMode });
    };

    renderForm = () => {
        const { loginMode } = this.state;
        const {
            errorMsg,
            login,
            register,
            registerFormFill,
            fieldsValue,
        } = this.props;

        if (loginMode) {
            return <LoginForm errorMsg={errorMsg} onLogin={login} />;
        }
        return (
            <RegisterForm
                errorMsg={errorMsg}
                setStage={this.setRegisterFormStages}
                stage={RegisterFormStages.basic}
                onSubmit={register}
                onChangeFields={registerFormFill}
                fieldsValue={fieldsValue}
            />
        );
    };

    isStageMore = (): boolean => {
        const { registerFormStage } = this.state;
        return registerFormStage === RegisterFormStages.more;
    };

    setRegisterFormStages = (stage: RegisterFormStages) =>
        this.setState({ registerFormStage: stage });

    render() {
        const { loginMode } = this.state;

        return (
            <div className='auth-screen'>
                <div
                    className={`auth-screen__banner ${
                        loginMode ? 'auth-screen__banner--login' : ''
                    } ${
                        this.isStageMore()
                            ? 'auth-screen__banner--register'
                            : ''
                    }`}
                >
                    <AuthBanner
                        onButtonClick={this.checkIt}
                        loginMode={this.state.loginMode}
                    />
                </div>
                <div
                    className={`auth-screen__form ${
                        loginMode ? 'auth-screen__form--login' : ''
                    } ${
                        this.isStageMore() ? 'auth-screen__form--register' : ''
                    }`}
                >
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}
