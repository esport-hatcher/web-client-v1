import { connect } from 'react-redux';
import { _AuthForm } from './Form';
import { IStoreState } from '@/reducers';

const mapStateToProps = (state: IStoreState) => {
    return {
        errorMsg: state.authentication.errorMsg,
    };
};

export const AuthForm = connect(mapStateToProps)(_AuthForm);
