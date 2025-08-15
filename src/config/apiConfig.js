export const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api/v1',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            ME: '/auth/me'
        },

        BLOCKCHAIN: {
            CHAIN: '/blockchain/chain',
            CREATE: '/blockchain/create',
            STATS: '/blockchain/stats',
            LIST: '/blockchain/list',
            BY_ID: (id) => `/blockchain/${id}`,
            CREATE_TEXT_BLOCK: '/blockchain/block/text'
        },

        BLOCK: {
            BY_ID: (id) => `/block/${id}`,
            CONTENT: (id) => `/block/${id}/content`,
            VALIDATE: (id) => `/block/${id}/validate`,
            LAST_HASH: (blockchainId) => `/block/blockchain/${blockchainId}/last-hash`
        },

        FILE: {
            UPLOAD: '/file/upload',
            VALIDATE: '/file/validate',
            SUPPORTED_TYPES: '/file/supported-types',
            EXTRACT_TEXT: '/file/extract-text'
        },

        USERS: {
            POINTS: '/users/points',
            STATS: '/users/stats',
            BY_ID: (id) => `/users/${id}`,
            UPDATE_POINTS: (id) => `/users/points/${id}`,
            GENERATE_RANDOM: '/users/generate-random',
            CLEAR: '/users/clear'
        },
        
        CONFIG: {
            BASE: '/config',
            DIFFICULTY: '/config/difficulty',
            RESET: '/config/reset'
        },
        
        VALIDATION: {
            BLOCKCHAIN: '/validation/blockchain',
            BLOCK: (id) => `/validation/block/${id}`,
            INTEGRITY: '/validation/integrity',
            SIMULATE: '/validation/simulate',
            REPAIR: '/validation/repair'
        }
    },
    
    TIMEOUT: {
        DEFAULT: 10000, 
        UPLOAD: 30000,  
        MINING: 60000   
    },
    
    FILE_CONFIG: {
        MAX_SIZE: 10 * 1024 * 1024,
        ALLOWED_TYPES: ['application/pdf', 'text/plain'],
        ALLOWED_EXTENSIONS: ['.pdf', '.txt']
    }
};

export default API_CONFIG;