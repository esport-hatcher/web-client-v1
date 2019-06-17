import { connect } from 'react-redux';
import { register, login } from '@/actions/auth';
import AuthPage from './AuthPage';

export default connect(
    null,
    {
        register,
        login,
    }
)(AuthPage);
