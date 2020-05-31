import { ITeams, Action, ActionTypes } from 'app/actions';

const teamsReducer = (state: ITeams[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchteamSucess:
            return action.payload;
        case ActionTypes.fetchTeamError:
            return [];
        default:
            return state;
    }
};

export default teamsReducer;
