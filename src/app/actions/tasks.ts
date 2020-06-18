import api from 'app/api';
import { ActionTypes, AppThunk, IFieldData } from './types';
import { IFormValues } from './form';
import { sendToast } from 'app/shared';
import { Dispatch } from 'redux';

export interface ITask {
    id: number;
    title: string;
    description: string;
    dateBegin: Date;
    dateEnd: Date;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/** CREATE ACTIONS */
export interface ICreateTaskSuccess {
    type: ActionTypes.createTaskSuccess;
    task: ITask;
}

/** GET ACTIONS */
export interface IFetchTaskSuccess {
    type: ActionTypes.fetchTaskSuccess;
    tasks: ITask[];
}

/** DELETE ACTIONS */
export interface IDeleteTaskSuccess {
    type: ActionTypes.deleteTaskSuccess;
    task: ITask;
}

/** PATCH ACTIONS */
export interface IPatchTaskSuccess {
    type: ActionTypes.patchTaskSuccess;
    task: ITask;
}

export const createTask = (
    createTaskFormValues: IFormValues,
    teamId?: number
): AppThunk => async dispatch => {
    try {
        const { data } = await api.post<ITask>(
            `/teams/${teamId ? teamId : '1'}/tasks`,
            createTaskFormValues
        );
        dispatch<ICreateTaskSuccess>({
            type: ActionTypes.createTaskSuccess,
            task: data,
        });
        sendToast({
            title: 'Task Created',
            content: 'You successfully created the task !',
            type: 'success',
        });
        return Promise.resolve();
    } catch ({
        response: {
            data: { message },
        },
    }) {
        sendToast({
            title: 'Task Error',
            content: message,
            type: 'error',
        });
        return Promise.reject(message);
    }
};

export const fetchTasks = () => async (dispatch: Dispatch) => {
    const { data } = await api.get<ITask[]>(`teams/1/tasks`);

    dispatch<IFetchTaskSuccess>({
        type: ActionTypes.fetchTaskSuccess,
        tasks: data,
    });
};

export const deleteTask = (task: ITask): AppThunk => async (
    dispatch: Dispatch
) => {
    try {
        await api.delete<ITask>(`teams/1/tasks/${task.id}`);

        dispatch<IDeleteTaskSuccess>({
            type: ActionTypes.deleteTaskSuccess,
            task: task,
        });
        sendToast({
            title: 'Task Deleted',
            content: 'You successfully deleted the task !',
            type: 'success',
        });
        return Promise.resolve();
    } catch ({
        response: {
            data: { message },
        },
    }) {
        sendToast({
            title: 'Task Error',
            content: message,
            type: 'error',
        });
        return Promise.reject(message);
    }
};

export const patchTask = (
    task: ITask,
    editData: IFieldData
): AppThunk => async (dispatch: Dispatch) => {
    try {
        const { data } = await api.patch<ITask>(
            `teams/1/tasks/${task.id}`,
            editData
        );

        dispatch<IPatchTaskSuccess>({
            type: ActionTypes.patchTaskSuccess,
            task: data,
        });
        return Promise.resolve();
    } catch ({
        response: {
            data: { message },
        },
    }) {
        sendToast({
            title: 'Task Error',
            content: message,
            type: 'error',
        });
        return Promise.reject(message);
    }
};
