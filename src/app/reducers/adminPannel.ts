import { IUser, Action, ActionTypes } from '@/actions';

export interface IAdminPannelFiltersCount {
    all: number;
    players: number;
    admins: number;
}
export interface IAdminPannelReducer {
    filters: IAdminPannelFiltersCount;
    users: IUser[];
    loading: boolean;
}

const INITIAL_STATE: IAdminPannelReducer = {
    filters: {
        all: 0,
        admins: 0,
        players: 0,
    },
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
        case ActionTypes.adminPannelCountFilters:
            return {
                ...state,
                filters: action.payload,
            };
        default:
            return state;
    }
};
