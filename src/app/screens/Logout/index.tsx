import { connect } from 'react-redux';
import { logout } from '@/actions';
import { _Logout } from './Logout';

export const Logout = connect(
    null,
    { logout }
)(_Logout);
