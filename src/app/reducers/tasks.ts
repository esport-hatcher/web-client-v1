import { Action, ITask, ActionTypes } from 'app/actions';

const tasksReducer = (state: ITask[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.createTaskSuccess:
            return [...state, action.task];
        case ActionTypes.fetchTaskSuccess:
            return [...state, ...action.tasks];
        case ActionTypes.deleteTaskSuccess:
            return state.filter(task => task.id !== action.task.id);
        case ActionTypes.patchTaskSuccess:
            return [
                ...state.filter(task => task.id !== action.task.id),
                action.task,
            ];
        default:
            return state;
    }
};

export default tasksReducer;
