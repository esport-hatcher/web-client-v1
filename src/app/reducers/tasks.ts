import { Action, ITask, ActionTypes } from 'app/actions';
import moment from 'moment';
import { remove, unionBy } from 'lodash';

const tasksReducer = (state: ITask[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.createTaskSuccess:
            return [...state, action.task];
        case ActionTypes.fetchTaskSuccess:
            return action.tasks;
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

export const getTodoTasks = (state: ITask[]): ITask[] => {
    return state.filter(task => !task.completed);
};

export const getCompletedTasks = (state: ITask[]): ITask[] => {
    return state.filter(task => task.completed);
};

export const getTodayTasks = (state: ITask[]): ITask[] => {
    return remove(state, task => {
        return (
            moment(task.dateEnd).isSame(new Date(), 'day') && !task.completed
        );
    });
};

export const getNext7Days = (state: ITask[]): ITask[] => {
    const next7Days = moment().add(7, 'days');
    const today = moment();
    return state.filter(
        task =>
            moment(task.dateEnd) > today &&
            moment(task.dateEnd) <= next7Days &&
            !task.completed
    );
};

export default tasksReducer;
