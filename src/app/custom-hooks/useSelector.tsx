import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { RootState } from 'app/reducers';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
