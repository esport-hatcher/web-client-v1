import { requireAdmin, requireLogin } from 'app/HOC';
import { _AdminPannel } from './AdminPannel';

export const AdminPannel = requireLogin(requireAdmin(_AdminPannel));
