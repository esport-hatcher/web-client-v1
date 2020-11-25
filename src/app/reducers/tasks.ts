import { Action, ITask, ActionTypes } from 'app/actions';
import { addDays, isToday } from 'date-fns';
import { remove } from 'lodash';

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
    const today = new Date();
    return state.filter(
        task => new Date(task.dateEnd) >= today && !task.completed
    );
};

export const getCompletedTasks = (state: ITask[]): ITask[] => {
    return state.filter(task => task.completed);
};

export const getTodayTasks = (state: ITask[]): ITask[] => {
    const today = new Date();
    return remove(state, task => {
        return (
            isToday(task.dateEnd) &&
            new Date(task.dateEnd) >= today &&
            !task.completed
        );
    });
};

export const getNext7Days = (state: ITask[]): ITask[] => {
    const today = new Date();
    const next7Days = addDays(today, 7);
    return state.filter(
        task =>
            new Date(task.dateEnd) > today &&
            new Date(task.dateEnd) <= next7Days &&
            !task.completed
    );
};

export const getLateTasks = (state: ITask[]): ITask[] => {
    const today = new Date();
    return state.filter(
        task => new Date(task.dateEnd) < today && !task.completed
    );
};

export default tasksReducer;
