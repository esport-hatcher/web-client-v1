import { IUser, Action, ActionTypes } from '@/actions';

export interface IAdminPannelReducer {
    users: IUser[];
    loading: boolean;
}

const INITIAL_STATE: IAdminPannelReducer = {
    users: [],
    loading: false,
};

export const adminPannelReducer = (
    state: IAdminPannelReducer = INITIAL_STATE,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.adminPannelSetLoading:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.adminPannelFetchUsersSuccess:
            return {
                ...state,
                users: action.payload || [],
                loading: false,
            };
        default:
            return state;
    }
};
