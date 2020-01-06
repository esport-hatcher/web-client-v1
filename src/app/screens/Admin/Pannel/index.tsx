import { requireAdmin, requireLogin } from '@/HOC';
import { _AdminPannel } from './AdminPannel';

export const AdminPannel = requireLogin(requireAdmin(_AdminPannel));
