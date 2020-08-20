import { ITeam, Action, ActionTypes } from 'app/actions';

const teamsReducer = (state: ITeam[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchTeamSuccess:
            return action.payload;
        case ActionTypes.fetchTeamError:
            return [];
        default:
            return state;
    }
};

export default teamsReducer;
