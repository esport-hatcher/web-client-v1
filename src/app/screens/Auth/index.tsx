import { _AuthPage } from './AuthPage';
import { requireAnonyme } from '@/HOC';

export const AuthPage = requireAnonyme(_AuthPage);
