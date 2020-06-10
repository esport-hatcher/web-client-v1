import api from 'app/api';
import { ActionTypes, AppThunk } from './types';
import { ReduxFormValues } from 'app/layouts';
import { sendToast } from 'app/shared';
import { Dispatch } from 'redux';

export interface ITask {
    id: number;
    title: string;
    description: string;
    dateBegin: Date;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
}

/** CREATE ACTIONS */
export interface ICreateTaskSuccess {
    type: ActionTypes.createTaskSuccess;
    payload: ITask[];
}

/** GET ACTIONS */
export interface IFetchTaskSuccess {
    type: ActionTypes.fetchTaskSuccess;
    payload: ITask[];
}

/** DELETE ACTIONS */
export interface IDeleteTaskSuccess {
    type: ActionTypes.deleteTaskSuccess;
    payload: ITask[];
}

/** PATCH ACTIONS */
export interface IPatchTaskSuccess {
    type: ActionTypes.patchTaskSuccess;
    payload: ITask[];
}

export const createTask = (
    createTaskFormValues: ReduxFormValues,
    teamId?: number
): AppThunk => async dispatch => {
    try {
        const { data } = await api.post<ITask[]>(
            `${teamId ? `/teams/${teamId}` : ''}/teams/8/tasks`,
            createTaskFormValues
        );
        dispatch<ICreateTaskSuccess>({
            type: ActionTypes.createTaskSuccess,
            payload: data,
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
    const { data } = await api.get<ITask[]>(`teams/8/tasks`);

    dispatch<IFetchTaskSuccess>({
        type: ActionTypes.fetchTaskSuccess,
        payload: data,
    });
};

export const deleteTask = (task: ITask): AppThunk => async (
    dispatch: Dispatch
) => {
    try {
        const { data } = await api.delete<ITask[]>(`teams/8/tasks/${task.id}`);

        dispatch<IDeleteTaskSuccess>({
            type: ActionTypes.deleteTaskSuccess,
            payload: data,
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

export const updateTask = (task: ITask): AppThunk => async (
    dispatch: Dispatch
) => {
    try {
        const { data } = await api.patch<ITask[]>(`teams/8/tasks/${task.id}`);

        dispatch<IPatchTaskSuccess>({
            type: ActionTypes.patchTaskSuccess,
            payload: data,
        });
        sendToast({
            title: 'Task Edited',
            content: 'You successfully edited the task !',
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
