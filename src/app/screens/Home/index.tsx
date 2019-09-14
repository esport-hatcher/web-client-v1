import { requireLogin } from '@/HOC';
import { _HomePage } from './HomePage';

export const HomePage = requireLogin(_HomePage);
