import { requireLogin } from 'app/HOC';
import { _TeamPage } from './TeamPage';
import { _EditTeamPage } from './EditTeamPage';

export const TeamPage = requireLogin(_TeamPage);
export const EditTeamPage = requireLogin(_EditTeamPage);
