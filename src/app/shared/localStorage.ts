import pick from 'lodash/pick';
import { RootState } from 'app/reducers';
import { LOCAL_TOKEN_NAME } from 'app/config';

type SerializableField = keyof RootState;

const SERIALIZABLE_FIELDS: SerializableField[] = ['authentication'];

export const deserializeState = (): Partial<RootState> | undefined => {
    try {
        const serializedState = localStorage.getItem(LOCAL_TOKEN_NAME);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const serializeState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(
            pick(state, ...SERIALIZABLE_FIELDS)
        );
        localStorage.setItem(LOCAL_TOKEN_NAME, serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

export const resetSerializedState = () => {
    try {
        localStorage.removeItem(LOCAL_TOKEN_NAME);
    } catch (err) {
        // Ignore write errors
    }
};
