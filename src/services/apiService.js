import api from './api';
import API_CONFIG from '../config/apiConfig';

class ApiService {
    async login(email, password) {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error de autenticación');
        }
    }

    async register(userData) {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error en el registro');
        }
    }

    async getCurrentUser() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.ME);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener usuario');
        }
    }

    async getBlockchain() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.BLOCKCHAIN.CHAIN);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener la blockchain: ' + error.message);
        }
    }

    async createTextBlock(content, blockchainId = null) {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.BLOCKCHAIN.CREATE_TEXT_BLOCK, {
                content,
                blockchainId
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear bloque');
        }
    }

    async createBlockchain(name, description) {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.BLOCKCHAIN.CREATE, {
                name,
                description
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear blockchain');
        }
    }

    async getBlockchainStats() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.BLOCKCHAIN.STATS);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener estadísticas: ' + error.message);
        }
    }

    async getActiveBlockchains() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.BLOCKCHAIN.LIST);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener blockchains: ' + error.message);
        }
    }

    async getBlockchainById(blockchainId) {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.BLOCKCHAIN.BY_ID(blockchainId));
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener blockchain: ' + error.message);
        }
    }

    async uploadFile(file, comment = '', blockchainId = null) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (comment) formData.append('comment', comment);
            if (blockchainId) formData.append('blockchainId', blockchainId);

            const response = await api.post(API_CONFIG.ENDPOINTS.FILE.UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: API_CONFIG.TIMEOUT.UPLOAD,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al subir archivo');
        }
    }

    async validateFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post(API_CONFIG.ENDPOINTS.FILE.VALIDATE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al validar archivo: ' + error.message);
        }
    }

    async getSupportedFileTypes() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.FILE.SUPPORTED_TYPES);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener tipos soportados: ' + error.message);
        }
    }

    async extractText(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post(API_CONFIG.ENDPOINTS.FILE.EXTRACT_TEXT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al extraer texto: ' + error.message);
        }
    }

    async validateBlockchain(blockchainId = null) {
        try {
            const url = blockchainId 
                ? `${API_CONFIG.ENDPOINTS.VALIDATION.BLOCKCHAIN}?blockchainId=${blockchainId}`
                : API_CONFIG.ENDPOINTS.VALIDATION.BLOCKCHAIN;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Error al validar la cadena: ' + error.message);
        }
    }

    async validateBlock(blockId) {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.VALIDATION.BLOCK(blockId));
            return response.data;
        } catch (error) {
            throw new Error('Error al validar bloque: ' + error.message);
        }
    }

    async getChainIntegrity(blockchainId = null) {
        try {
            const url = blockchainId 
                ? `${API_CONFIG.ENDPOINTS.VALIDATION.INTEGRITY}?blockchainId=${blockchainId}`
                : API_CONFIG.ENDPOINTS.VALIDATION.INTEGRITY;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener integridad: ' + error.message);
        }
    }

    async simulateValidation(blockchainId = null) {
        try {
            const url = blockchainId 
                ? `${API_CONFIG.ENDPOINTS.VALIDATION.SIMULATE}?blockchainId=${blockchainId}`
                : API_CONFIG.ENDPOINTS.VALIDATION.SIMULATE;
            const response = await api.post(url);
            return response.data;
        } catch (error) {
            throw new Error('Error en simulación: ' + error.message);
        }
    }

    async repairBlockchain(blockchainId = null) {
        try {
            const url = blockchainId 
                ? `${API_CONFIG.ENDPOINTS.VALIDATION.REPAIR}?blockchainId=${blockchainId}`
                : API_CONFIG.ENDPOINTS.VALIDATION.REPAIR;
            const response = await api.post(url);
            return response.data;
        } catch (error) {
            throw new Error('Error al reparar blockchain: ' + error.message);
        }
    }

    async getCurrentConfig() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.CONFIG.BASE);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener configuración: ' + error.message);
        }
    }

    async updateDifficulty(difficulty) {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.CONFIG.DIFFICULTY, { difficulty });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al actualizar dificultad');
        }
    }

    async resetConfig() {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.CONFIG.RESET);
            return response.data;
        } catch (error) {
            throw new Error('Error al resetear configuración: ' + error.message);
        }
    }

    async getUsersWithPoints() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.USERS.POINTS);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener usuarios: ' + error.message);
        }
    }

    async createUserPoints(userData) {
        try {
            const response = await api.post(API_CONFIG.ENDPOINTS.USERS.POINTS, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear usuario');
        }
    }

    async updateUserPoints(userId, points) {
        try {
            const response = await api.put(API_CONFIG.ENDPOINTS.USERS.UPDATE_POINTS(userId), { points });
            return response.data;
        } catch (error) {
            throw new Error('Error al actualizar puntos: ' + error.message);
        }
    }

    async getUserStats() {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.USERS.STATS);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener estadísticas: ' + error.message);
        }
    }

    async generateRandomUsers(count = 5) {
        try {
            const response = await api.post(`${API_CONFIG.ENDPOINTS.USERS.GENERATE_RANDOM}?count=${count}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al generar usuarios: ' + error.message);
        }
    }

    async clearAllUsers() {
        try {
            const response = await api.delete(API_CONFIG.ENDPOINTS.USERS.CLEAR);
            return response.data;
        } catch (error) {
            throw new Error('Error al limpiar usuarios: ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.USERS.BY_ID(userId));
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener usuario: ' + error.message);
        }
    }

    async getBlockById(blockId) {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.BLOCK.BY_ID(blockId));
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener bloque: ' + error.message);
        }
    }

    async getBlockContent(blockId) {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.BLOCK.CONTENT(blockId));
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener contenido del bloque: ' + error.message);
        }
    }

    async getLastBlockHash(blockchainId) {
        try {
            const response = await api.get(API_CONFIG.ENDPOINTS.BLOCK.LAST_HASH(blockchainId));
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener último hash: ' + error.message);
        }
    }
}

export default new ApiService();