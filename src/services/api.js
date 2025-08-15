class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:8080/api/v1';
    }

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
            credentials: 'include',
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

    async getBlockchain() {
        try {
            console.log('Fetching blockchain data...');
            const data = await this.request('/blockchain/chain');

            if (Array.isArray(data)) {
                return { chain: data, success: true };
            } else if (data.chain && Array.isArray(data.chain)) {
                return data;
            } else {
                console.warn('Unexpected blockchain data format:', data);
                return { chain: [], success: false };
            }
        } catch (error) {
            console.error('Error fetching blockchain:', error);
            const localData = JSON.parse(localStorage.getItem('blockchain_data') || '{"chain": []}');
            return localData;
        }
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

    async uploadFile(file, comment = '', blockchainId = null) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);
        if (comment) formData.append('comment', comment);
        if (blockchainId) formData.append('blockchainId', blockchainId);

        console.log('Uploading file:', file.name, 'with comment:', comment);

        const response = await fetch(`${this.baseURL}/file/upload`, {
            method: 'POST',
            headers: {
                ...(token && { Authorization: `Bearer ${token}` })
            },
            credentials: 'include',
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al subir archivo');
        }
        return data;
    }

    async validateBlockchain(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/blockchain?blockchainId=${blockchainId}`
            : '/validation/blockchain';
        return this.request(endpoint);
    }

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

    async getUsersWithPoints() {
        try {
            console.log('Fetching users with points...');
            const users = await this.request('/users/points');
            console.log('Users fetched:', users.length, 'users');
            return users;
        } catch (error) {
            console.error('Error fetching users with points:', error);
            throw error;
        }
    }

    async syncUserPoints() {
        return this.request('/users/sync', {
            method: 'POST'
        });
    }

    async getUserStats() {
        try {
            const stats = await this.request('/users/stats');
            return stats;
        } catch (error) {
            console.warn('Using fallback user stats calculation');
            const users = await this.getUsersWithPoints();
            if (Array.isArray(users)) {
                const totalUsers = users.length;
                const totalPoints = users.reduce((sum, user) => sum + (user.point || 0), 0);
                const averagePoints = totalUsers > 0 ? totalPoints / totalUsers : 0;
                const maxPoints = totalUsers > 0 ? Math.max(...users.map(u => u.point || 0)) : 0;
                
                return {
                    totalUsers,
                    totalPoints,
                    averagePoints: Math.round(averagePoints * 100) / 100,
                    maxPoints,
                    timestamp: Date.now()
                };
            }
            return { totalUsers: 0, totalPoints: 0, averagePoints: 0, maxPoints: 0 };
        }
    }

    async generateRandomUsers(count = 5) {
        return this.request(`/users/generate-random?count=${count}`, {
            method: 'POST'
        });
    }

    async clearAllUsers() {
        return this.request('/users/clear', { method: 'DELETE' });
    }

    async getMiningStats() {
        return this.request('/mining/stats');
    }

    async startMining(content = '') {
        return this.request('/mining/start', {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    }

    async getChainIntegrity(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/integrity?blockchainId=${blockchainId}`
            : '/validation/integrity';
        return this.request(endpoint);
    }

    async simulateValidation(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/simulate?blockchainId=${blockchainId}`
            : '/validation/simulate';
        return this.request(endpoint, { method: 'POST' });
    }

    async repairBlockchain(blockchainId = null) {
        const endpoint = blockchainId 
            ? `/validation/repair?blockchainId=${blockchainId}`
            : '/validation/repair';
        return this.request(endpoint, { method: 'POST' });
    }

    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}/config`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            
            console.log('Connection test - Status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Connection test - Success:', data);
                return { success: true, data };
            } else {
                console.log('Connection test - Failed:', response.statusText);
                return { success: false, error: response.statusText };
            }
        } catch (error) {
            console.error('Connection test - Error:', error);
            return { success: false, error: error.message };
        }
    }
}

const apiService = new ApiService();

export default apiService;