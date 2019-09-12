import { connect } from 'react-redux';
import { register, login } from '@/actions/authentication';
import { _AuthPage } from './AuthPage';
import { IStoreState } from '@/reducers';
import { registerFormFill } from '@/actions';

const mapStateToProps = ({
    authentication: { errorMsg },
    registerForm,
}: IStoreState) => {
    return {
        errorMsg,
        fieldsValue: registerForm,
    };
};

export const AuthPage = connect(
    mapStateToProps,
    {
        register,
        login,
        registerFormFill,
    }
)(_AuthPage);
