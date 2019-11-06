export * from './Confirmation';

export interface IModal {
    title?: string;
    message: string;
    onConfirm: Function;
    onClose: () => void;
}
