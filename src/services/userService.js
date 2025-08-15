import api from './api';

export const userService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw new Error('Error al iniciar sesión: ' + error.message);
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw new Error('Error al registrar usuario: ' + error.message);
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener usuario actual: ' + error.message);
        }
    },

    getUsersWithPoints: async () => {
        try {
            const response = await api.get('/users/points');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener usuarios: ' + error.message);
        }
    },

    createUserWithPoints: async (userData) => {
        try {
            const response = await api.post('/users/points', userData);
            return response.data;
        } catch (error) {
            throw new Error('Error al crear usuario: ' + error.message);
        }
    },

    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener usuario: ' + error.message);
        }
    },

    updateUserPoints: async (id, points) => {
        try {
            const response = await api.put(`/users/points/${id}`, { points });
            return response.data;
        } catch (error) {
            throw new Error('Error al actualizar puntos: ' + error.message);
        }
    },

    generateRandomUsers: async (count = 5) => {
        try {
            const response = await api.post(`/users/generate-random?count=${count}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al generar usuarios: ' + error.message);
        }
    },

    getUserStats: async () => {
        try {
            const response = await api.get('/users/stats');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener estadísticas: ' + error.message);
        }
    },

    clearAllUsers: async () => {
        try {
            const response = await api.delete('/users/clear');
            return response.data;
        } catch (error) {
            throw new Error('Error al limpiar usuarios: ' + error.message);
        }
    }
};