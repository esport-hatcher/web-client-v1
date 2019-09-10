import { connect } from 'react-redux';
import { register, login } from '@/actions/authentication';
import { _AuthPage } from './AuthPage';

export const AuthPage = connect(
    null,
    {
        register,
        login,
    }
)(_AuthPage);
