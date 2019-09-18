import React from 'react';
import { NavBar } from './Navigation';
import { connect } from 'react-redux';
import { IStoreState } from '@/reducers';
import { IUser } from '@/actions';

interface IProps {
    user?: IUser;
}

export const RNavigation: React.FC<IProps> = ({ user }) => {
    if (user) {
        return <NavBar admin={user.superAdmin} />;
    }
    return null;
};

const mapStateToProps = (state: IStoreState) => {
    return {
        user: state.authentication.user,
    };
};

export const Navigation = connect(mapStateToProps)(RNavigation);
