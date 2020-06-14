import { ITeams, Action, ActionTypes, IUser } from 'app/actions';

export interface ITeamsReducer {
    team: ITeams[];
    teamUsers: IUser[];
}

const INITIAL_STATE: ITeamsReducer = {
    team: [],
    teamUsers: [],
};

const teamsReducer = (state: ITeamsReducer = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchTeamSuccess:
            return {
                ...state,
                teams: action.payload,
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

export default teamsReducer;
