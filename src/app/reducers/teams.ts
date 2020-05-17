import { ITeams, Action, ActionTypes, IUser } from '@/actions';

export interface IFetchTeam {
    team: ITeams[];
    teamUsers: IUser[];
}

const INITIAL_STATE: IFetchTeam = {
    team: [],
    teamUsers: [],
};

export const fetchTeamsReducer = (
    state: IFetchTeam = INITIAL_STATE,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.fetchUsersSucess:
            return {
                ...state,
                teamUsers: action.payload,
            };
        case ActionTypes.fetchteamSucess:
            return {
                ...state,
                team: action.payload,
            };
        case ActionTypes.fetchTeamError:
            return {
                ...state,
                teams: action.payload || [],
            };
        case ActionTypes.fetchTeamUserError:
            return {
                ...state,
                teams: action.payload || [],
            };
        default:
            return state;
    }
};
