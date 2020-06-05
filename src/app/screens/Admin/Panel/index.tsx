import { requireAdmin, requireLogin } from 'app/HOC';
import { _AdminPanel } from './AdminPanel';

export const AdminPanel = requireLogin(requireAdmin(_AdminPanel));
