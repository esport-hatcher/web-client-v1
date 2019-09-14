import React, { Component } from 'react';
import { AuthBanner, RegisterForm, LoginForm } from '@/layouts';
import {
    registerFormFill,
    IRegisterForm,
    IRegisterProps,
    RegisterFormStages,
    registerFormSetStage,
} from '@/actions';

interface IAuthPageProps {
    isLogin: boolean;
    errorMsg?: string;
    registerFormFill: typeof registerFormFill;
    fields: IRegisterProps;
    register: (registerProps: IRegisterForm) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    setStage: typeof registerFormSetStage;
    stage: RegisterFormStages;
}

interface IAuthPageState {
    loginMode: boolean;
}

export class _AuthPage extends Component<IAuthPageProps, IAuthPageState> {
    constructor(props: IAuthPageProps) {
        super(props);
        this.state = {
            loginMode: this.props.isLogin,
        };
    }

    checkIt = () => {
        this.setState({ loginMode: !this.state.loginMode });
    };

    renderForm = () => {
        const { loginMode } = this.state;
        const {
            errorMsg,
            login,
            register,
            registerFormFill,
            fields,
            stage,
            setStage,
        } = this.props;

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

    isStageMore = (): boolean => this.props.stage === RegisterFormStages.more;

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
