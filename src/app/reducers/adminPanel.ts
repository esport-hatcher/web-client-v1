import unionBy from 'lodash/unionBy';
import {
    IUser,
    Action,
    ActionTypes,
    IAdminPanelFiltersCount,
} from 'app/actions';

export interface IAdminPanelReducer {
    filters: IAdminPanelFiltersCount;
    users: IUser[];
    pages: number;
    loading: boolean;
}

const INITIAL_STATE: IAdminPanelReducer = {
    filters: {
        all: 0,
        admins: 0,
        players: 0,
    },
    pages: 1,
    users: [],
    loading: false,
};

const adminPanelReducer = (
    state: IAdminPanelReducer = INITIAL_STATE,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.adminPanelSetLoading:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.adminPanelFetchNextPageSuccess:
            return {
                ...state,
                users: unionBy(state.users, action.payload, 'id'),
                loading: false,
            };
        case ActionTypes.adminPanelFetchUsersSuccess:
            return {
                ...state,
                users: action.payload.users || [],
                pages: action.payload.pages,
                loading: false,
            };
        case ActionTypes.adminPanelCountFilters:
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

export default adminPanelReducer;
