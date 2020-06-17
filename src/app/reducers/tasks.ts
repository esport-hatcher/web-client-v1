import { Action, ITask, ActionTypes } from 'app/actions';
import unionBy from 'lodash/unionBy';
import findIndex from 'lodash/findIndex';

const tasksReducer = (state: ITask[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.createTaskSuccess:
            return [...state, action.task];
        case ActionTypes.fetchTaskSuccess:
            // merge state and action.tasks while removing duplicates by id
            return unionBy(state, action.tasks, 'id');
        case ActionTypes.deleteTaskSuccess:
            return state.filter(task => task.id !== action.task.id);
        case ActionTypes.patchTaskSuccess:
            return state.map(task =>
                task.id === action.task.id ? action.task : task
            );
        default:
            return state;
    }
};

export default tasksReducer;
