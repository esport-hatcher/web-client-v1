import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { IStoreState } from 'app/reducers';

export const useSelector: TypedUseSelectorHook<IStoreState> = useReduxSelector;
