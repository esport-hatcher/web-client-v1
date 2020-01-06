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
        case ActionTypes.deleteUser:
            return {
                ...state,
                users: state.users.filter(
                    user => user.id !== action.payload.id
                ),
                filters: {
                    ...state.filters,
                    all: state.filters.all - 1,
                    admins: action.payload.superAdmin
                        ? state.filters.admins - 1
                        : state.filters.admins,
                    players: !action.payload.superAdmin
                        ? state.filters.players - 1
                        : state.filters.players,
                },
            };
        default:
            return state;
    }
};
