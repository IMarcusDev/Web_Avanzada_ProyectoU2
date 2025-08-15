import api from './api';

export const miningService = {
    getStats: async () => {
        try {
            const response = await api.get('/mining/stats');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener estadísticas de minado: ' + (error.response?.data?.error || error.message));
        }
    },

    startMining: async (content = '') => {
        try {
            const response = await api.post('/mining/start', { content });
            return response.data;
        } catch (error) {
            throw new Error('Error al iniciar minado: ' + (error.response?.data?.error || error.message));
        }
    }
};
