import { connect } from 'react-redux';
import { register, login } from '@/actions/authentication';
import { _AuthPage } from './AuthPage';
import { IStoreState } from '@/reducers';
import { registerFormFill, registerFormSetStage } from '@/actions';

const mapStateToProps = ({
    authentication: { errorMsg },
    registerForm: { stage, fields },
}: IStoreState) => {
    return {
        errorMsg,
        fieldsValue: fields,
        stage,
    };
};

export const AuthPage = connect(
    mapStateToProps,
    {
        register,
        login,
        registerFormFill,
        setStage: registerFormSetStage,
    }
)(_AuthPage);
