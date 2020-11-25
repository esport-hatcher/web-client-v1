import { ActionTypes } from './types';

type FormField = string | number | boolean | Date;

export type OnSubmitFunction = (formValues: IFormValues) => void;

export interface IFormValues {
    [key: string]: FormField;
}

export interface IUpdateForm {
    type: ActionTypes.updateForm;
    payload: {
        formName: string;
        formValues: IFormValues;
    };
}

export interface IResetForm {
    type: ActionTypes.resetForm;
    formName: string;
}

export const getUpdateForm = (formName: string) => (
    formValues: IFormValues
): IUpdateForm => ({
    type: ActionTypes.updateForm,
    payload: {
        formName,
        formValues: formValues,
    },
});

export const getResetForm = (formName: string) => (): IResetForm => ({
    type: ActionTypes.resetForm,
    formName,
});
