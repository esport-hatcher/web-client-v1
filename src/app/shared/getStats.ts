import api from 'app/api';

export const fetchStats = async (teamId: number, userId?: number) => {
    try {
        const { data } = await api.get(
            `${
                userId
                    ? `teams/${teamId}/users/${userId}/stats`
                    : `teams/${teamId}/users/stats`
            }`
        );
        return data;
    } catch (err) {
        //console.log('Stats', err);
    }
};
