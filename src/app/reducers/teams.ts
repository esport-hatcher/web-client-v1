import { ITeam, Action, ActionTypes, IUser } from 'app/actions';
import concat from 'lodash/concat';

export interface ITeamsReducer {
    teams: ITeam[];
    teamUsers: IUser[];
}

const INITIAL_STATE: ITeamsReducer = {
    teams: [],
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
                teams: [],
            };
        case ActionTypes.createTeamSucess:
            return {
                ...state,
                teams: concat(state.teams, action.payload),
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
