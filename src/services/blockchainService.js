import api from './api';

export const blockchainService = {
    getBlockchain: async () => {
        try {
            const response = await api.get('/blockchain/chain');
            return { chain: response.data };
        } catch (error) {
            throw new Error('Error al obtener la blockchain: ' + error.message);
        }
    },

    createTextBlock: async (content, blockchainId = null) => {
        try {
            const response = await api.post('/blockchain/block/text', {
                content,
                blockchainId
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al crear bloque: ' + error.message);
        }
    },

    validateChain: async (blockchainId = null) => {
        try {
            const url = blockchainId 
                ? `/validation/blockchain?blockchainId=${blockchainId}`
                : '/validation/blockchain';
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Error al validar la cadena: ' + error.message);
        }
    },

    mineBlock: async (data) => {
        try {
            return await blockchainService.createTextBlock(data);
        } catch (error) {
            throw new Error('Error al minar bloque: ' + error.message);
        }
    },

    getStats: async () => {
        try {
            const response = await api.get('/blockchain/stats');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener estadísticas: ' + error.message);
        }
    },

    setDifficulty: async (difficulty) => {
        try {
            const response = await api.post('/config/difficulty', { difficulty });
            return response.data;
        } catch (error) {
            throw new Error('Error al configurar dificultad: ' + error.message);
        }
    },

    getConfig: async () => {
        try {
            const response = await api.get('/config');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener configuración: ' + error.message);
        }
    },

    createBlockchain: async (name, description) => {
        try {
            const response = await api.post('/blockchain/create', {
                name,
                description
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al crear blockchain: ' + error.message);
        }
    },

    getBlockchainById: async (blockchainId) => {
        try {
            const response = await api.get(`/blockchain/${blockchainId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener blockchain: ' + error.message);
        }
    },

    getActiveBlockchains: async () => {
        try {
            const response = await api.get('/blockchain/list');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener blockchains: ' + error.message);
        }
    },

    getChainIntegrity: async (blockchainId = null) => {
        try {
            const url = blockchainId 
                ? `/validation/integrity?blockchainId=${blockchainId}`
                : '/validation/integrity';
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener integridad: ' + error.message);
        }
    }
};