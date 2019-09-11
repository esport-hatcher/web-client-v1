import { connect } from 'react-redux';
import { register, login } from '@/actions/authentication';
import { _AuthPage } from './AuthPage';
import { IStoreState } from '@/reducers';

const mapStateToProps = ({ authentication: { errorMsg } }: IStoreState) => {
    return {
        errorMsg,
    };
};

export const AuthPage = connect(
    mapStateToProps,
    {
        register,
        login,
    }
)(_AuthPage);
