import { useDispatch } from 'react-redux';
import { store } from 'app/config';

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
