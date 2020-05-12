import { _AuthPage } from './AuthPage';
import { requireAnonyme } from 'app/HOC';

export const AuthPage = requireAnonyme(_AuthPage);
