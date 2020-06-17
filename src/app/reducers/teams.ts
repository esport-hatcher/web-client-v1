import { ITeams, Action, ActionTypes, IUser } from 'app/actions';
import concat from 'lodash/concat';

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
                team: action.payload,
            };
        case ActionTypes.fetchTeamError:
            return {
                ...state,
                teams: action.payload || [],
            };
        case ActionTypes.createTeamSucess:
            return {
                ...state,
                team: concat(state.team, action.payload),
            };
        case ActionTypes.createTeamError:
            return {
                ...state,
            };
        case ActionTypes.fetchTeamUserSucess:
            return {
                ...state,
                teamUsers: action.payload,
            };
        case ActionTypes.invitePlayerSucess:
            return {
                ...state,
                teamUsers: concat(state.teamUsers, action.payload),
            };
        default:
            return state;
    }
};

export default teamsReducer;
