import api from 'app/api';
import { ActionTypes, AppThunk, IFieldData, IGetState } from './types';
import { IFormValues } from './form';
import { sendToast } from 'app/shared';
import { Dispatch } from 'redux';
import { ITeams } from './teams';

export interface ITask {
    id: number;
    title: string;
    description: string;
    dateBegin: Date;
    dateEnd: Date;
    completed: boolean;
    TeamId: number;
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
    team?: ITeams
): AppThunk => async (dispatch: Dispatch, getState: IGetState) => {
    try {
        const user = getState().authentication.user;
        if (user) {
            const { data } = await api.post<ITask>(
                `${
                    team ? `/teams/${team.id}/tasks` : `/users/${user.id}/tasks`
                }`,
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
        }
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

export const fetchTasks = (team?: ITeams): AppThunk => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    const user = getState().authentication.user;
    if (user) {
        const { data } = await api.get<ITask[]>(
            `${team ? `/teams/${team.id}/tasks` : `/users/${user.id}/tasks`}`
        );
        dispatch<IFetchTaskSuccess>({
            type: ActionTypes.fetchTaskSuccess,
            tasks: data,
        });
    }
};

export const deleteTask = (task: ITask): AppThunk => async (
    dispatch: Dispatch,
    getState: IGetState
) => {
    try {
        const user = getState().authentication.user;
        if (user) {
            await api.delete<ITask>(
                `${
                    task.TeamId
                        ? `/teams/${task.TeamId}/tasks/${task.id}`
                        : `/users/${user.id}/tasks/${task.id}`
                }`
            );
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
        }
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
): AppThunk => async (dispatch: Dispatch, getState: IGetState) => {
    try {
        const user = getState().authentication.user;
        if (user) {
            const { data } = await api.patch<ITask>(
                `${
                    task.TeamId
                        ? `/teams/${task.TeamId}/tasks/${task.id}`
                        : `/users/${user.id}/tasks/${task.id}`
                }`,
                editData
            );
            dispatch<IPatchTaskSuccess>({
                type: ActionTypes.patchTaskSuccess,
                task: data,
            });
            return Promise.resolve();
        }
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
