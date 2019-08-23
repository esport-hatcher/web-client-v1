import { Navigation } from './Navigation';
import { connect } from 'react-redux';
import { IState } from 'src/typings/states/global';

const mapStateToProps = (state: IState) => {
    return {
        auth: state.auth.token,
    };
};
export default connect(mapStateToProps)(Navigation);
