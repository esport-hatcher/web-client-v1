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
        case ActionTypes.joinTeamSucess:
            return {
                ...state,
                //teamUsers: concat(state.teamUsers, action.payload),
            };
        case ActionTypes.fetchTeamUserSucess:
            return {
                ...state,
                teamUsers: action.payload,
            };
        case ActionTypes.fetchTeamUserError:
            return {
                ...state,
                teamUsers: [],
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

export const getTeamById = (
    state: ITeam[],
    teamId?: number
): ITeam | undefined => {
    if (teamId) {
        const team = state.find(team => team.id === teamId);
        return team;
    }
    return undefined;
};

/** RETURN only teams where TeamUser = 'Owner' | 'Admin'  */
export const getAdminTeams = (state: ITeam[]): ITeam[] => {
    return state.filter(
        team => team.TeamUser.role === 'Owner' || team.TeamUser.role === 'Admin'
    );
};

export default teamsReducer;
