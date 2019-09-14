import { requireAdmin } from '@/HOC';
import { _AdminPannel } from './AdminPannel';

export const AdminPannel = requireAdmin(_AdminPannel);
