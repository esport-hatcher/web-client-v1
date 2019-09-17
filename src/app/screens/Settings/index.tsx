import { _SettingsPage } from './SettingsPage';
import { requireLogin } from '@/HOC';

export const SettingsPage = requireLogin(_SettingsPage);
