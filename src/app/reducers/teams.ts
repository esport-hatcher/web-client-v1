import { ITeams, Action, ActionTypes } from 'app/actions';

export interface IFetchTeam {
    team: ITeams[];
}

const INITIAL_STATE: IFetchTeam = {
    team: [],
};

export const fetchTeamsReducer = (
    state: IFetchTeam = INITIAL_STATE,
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.fetchteamSucess:
            return {
                team: action.payload,
            };
        case ActionTypes.fetchTeamError:
            return {
                ...state,
                teams: action.payload || [],
            };
        default:
            return state;
    }
};
