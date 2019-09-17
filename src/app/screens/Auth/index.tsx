import { connect } from 'react-redux';
import { register, login } from '@/actions/authentication';
import { _AuthPage } from './AuthPage';
import { IStoreState } from '@/reducers';
import { registerFormFill, registerFormSetStage } from '@/actions';
import { requireAnonyme } from '@/HOC';

const mapStateToProps = ({
    authentication: { errorMsg },
    registerForm: { stage, fields },
}: IStoreState) => {
    return {
        errorMsg,
        fields,
        stage,
    };
};

export const AuthPage = requireAnonyme(
    connect(
        mapStateToProps,
        {
            register,
            login,
            registerFormFill,
            setStage: registerFormSetStage,
        }
    )(_AuthPage)
);
