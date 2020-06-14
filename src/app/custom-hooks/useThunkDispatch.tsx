import { useDispatch } from 'react-redux';
import { store } from 'index';

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
