import { useDispatch } from 'react-redux';
import { store } from '@/config';

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
