import api from 'app/api';
import { ActionTypes, AppThunk, IGetState } from './types';
import { ReduxFormValues } from 'app/layouts';
import { sendToast } from 'app/shared';
import { Dispatch } from 'redux';

export interface ITask {
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

export const createTask = (
    createTaskFormValues: ReduxFormValues,
    teamId: number
): AppThunk => async dispatch => {
    try {
        const { data } = await api.post<ITask[]>(
            `/teams/${teamId}/tasks`,
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
    const { data } = await api.get<ITask[]>(`teams/1/tasks`);

    dispatch<IFetchTaskSuccess>({
        type: ActionTypes.fetchTaskSuccess,
        payload: data,
    });
};
