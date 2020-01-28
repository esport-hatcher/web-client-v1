import { requireLogin } from 'app/HOC';
import { _HomePage } from './HomePage';

export const HomePage = requireLogin(_HomePage);
