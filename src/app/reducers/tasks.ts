import { Action, ITask, ActionTypes } from 'app/actions';

const tasksReducer = (state: ITask[] | null = null, action: Action) => {
    switch (action.type) {
        case ActionTypes.createTaskSuccess:
            return action.payload;
        default:
            return state;
    }
};

export default tasksReducer;
