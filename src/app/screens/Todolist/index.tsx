import { requireLogin } from 'app/HOC';
import { _TodolistPage } from './TodolistPage';

export const TodolistPage = requireLogin(_TodolistPage);
