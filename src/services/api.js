// src/services/api.js - Versión simplificada y consolidada
class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:8080/api/v1';
    }

    // Método base para todas las peticiones
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const url = `${this.baseURL}${endpoint}`;
        
        console.log(`Making request to: ${url}`);
        console.log(`Token present: ${!!token}`);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            console.log(`Response status: ${response.status}`);
            
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = { error: await response.text() };
            }
            
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('Token inválido, limpiando sesión...');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                }
                throw new Error(data.error || `Error ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error.message);
            throw error;
        }
    }

    // AUTENTICACIÓN
    async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async getCurrentUser() {
        return this.request('/auth/me');
    }

    // BLOCKCHAIN
    async getBlockchain() {
        return this.request('/blockchain/chain');
    }

    async createTextBlock(content, blockchainId = null) {
        return this.request('/blockchain/block/text', {
            method: 'POST',
            body: JSON.stringify({ content, blockchainId })
        });
    }

    async getBlockchainStats() {
        return this.request('/blockchain/stats');
    }

    // ARCHIVOS
    async uploadFile(file, comment = '', blockchainId = null) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);
        if (comment) formData.append('comment', comment);
        if (blockchainId) formData.append('blockchainId', blockchainId);

        const response = await fetch(`${this.baseURL}/file/upload`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` })
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al subir archivo');
        }
        return data;
    }

    // VALIDACIÓN
    async validateBlockchain(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/blockchain?blockchainId=${blockchainId}`
            : '/validation/blockchain';
        return this.request(endpoint);
    }

    // CONFIGURACIÓN
    async getCurrentConfig() {
        return this.request('/config');
    }

    async updateDifficulty(difficulty) {
        return this.request('/config/difficulty', {
            method: 'POST',
            body: JSON.stringify({ difficulty })
        });
    }

    async resetConfig() {
        return this.request('/config/reset', { method: 'POST' });
    }

    // USUARIOS Y PUNTOS
    async getUsersWithPoints() {
        return this.request('/users/points');
    }

    async getUserStats() {
        return this.request('/users/stats');
    }

    async generateRandomUsers(count = 5) {
        return this.request(`/users/generate-random?count=${count}`, {
            method: 'POST'
        });
    }

    async clearAllUsers() {
        return this.request('/users/clear', { method: 'DELETE' });
    }

    // MINADO
    async getMiningStats() {
        return this.request('/mining/stats');
    }

    async startMining(content = '') {
        return this.request('/mining/start', {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    }

    // MÉTODOS ADICIONALES QUE FALTABAN

    // Para Auditoría - alias de getBlockchainStats
    async getStats() {
        return this.getBlockchainStats();
    }

    // Validación de integridad
    async getChainIntegrity(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/integrity?blockchainId=${blockchainId}`
            : '/validation/integrity';
        return this.request(endpoint);
    }

    // Simulación de validación
    async simulateValidation(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/simulate?blockchainId=${blockchainId}`
            : '/validation/simulate';
        return this.request(endpoint, { method: 'POST' });
    }

    // Reparar blockchain
    async repairBlockchain(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/repair?blockchainId=${blockchainId}`
            : '/validation/repair';
        return this.request(endpoint, { method: 'POST' });
    }

    // Crear blockchain
    async createBlockchain(name, description) {
        return this.request('/blockchain/create', {
            method: 'POST',
            body: JSON.stringify({ name, description })
        });
    }

    // Obtener blockchain por ID
    async getBlockchainById(blockchainId) {
        return this.request(`/blockchain/${blockchainId}`);
    }

    // Obtener blockchains activas
    async getActiveBlockchains() {
        return this.request('/blockchain/list');
    }

    // Obtener bloque por ID
    async getBlockById(blockId) {
        return this.request(`/block/${blockId}`);
    }

    // Obtener contenido de bloque
    async getBlockContent(blockId) {
        return this.request(`/block/${blockId}/content`);
    }

    // Validar bloque específico
    async validateBlock(blockId) {
        return this.request(`/validation/block/${blockId}`);
    }

    // Obtener último hash de blockchain
    async getLastBlockHash(blockchainId) {
        return this.request(`/block/blockchain/${blockchainId}/last-hash`);
    }

    // Actualizar puntos de usuario
    async updateUserPoints(userId, points) {
        return this.request(`/users/points/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ points })
        });
    }

    // Obtener usuario por ID
    async getUserById(userId) {
        return this.request(`/users/${userId}`);
    }

    // Crear usuario con puntos
    async createUserPoints(userData) {
        return this.request('/users/points', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
}

// Instancia única del servicio
const apiService = new ApiService();
export default apiService;