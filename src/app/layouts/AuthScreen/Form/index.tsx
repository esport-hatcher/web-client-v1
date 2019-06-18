import { connect } from 'react-redux';
import AuthForm from './Form';
import { IState } from 'src/typings/states/global';

const mapStateToProps = (state: IState) => {
    return {
        errorMsg: state.auth.errorMsg,
    };
};

export default connect(mapStateToProps)(AuthForm);
