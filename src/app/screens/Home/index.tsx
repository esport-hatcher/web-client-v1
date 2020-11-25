import { requireLogin } from 'app/HOC';
import { TeamPage } from '../Teams/index';

export const HomePage = requireLogin(TeamPage);
