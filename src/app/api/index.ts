import axios from 'axios';
import { store } from 'index';

const api = axios.create({
    baseURL: '/api/',
});

api.interceptors.request.use(config => {
    const {
        authentication: { token },
    } = store.getState();

    config.headers.authorization = token ? `Bearer ${token}` : null;
    return config;
});

export default api;
