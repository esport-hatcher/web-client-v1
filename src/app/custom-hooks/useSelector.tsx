import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { IStoreState } from '@/reducers';

export const useSelector: TypedUseSelectorHook<IStoreState> = useReduxSelector;
