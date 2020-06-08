import { Action, ITask, ActionTypes } from 'app/actions';

const tasksReducer = (state: ITask[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.createTaskSuccess:
            return action.payload;
        case ActionTypes.fetchTaskSuccess:
            return action.payload;
        default:
            return state;
    }
};

export default tasksReducer;
