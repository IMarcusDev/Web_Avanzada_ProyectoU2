const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api/v1',
    TIMEOUT: {
        DEFAULT: 10000,
        UPLOAD: 30000
    },
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            ME: '/auth/me'
        },
        BLOCKCHAIN: {
            CHAIN: '/blockchain/chain',
            CREATE: '/blockchain/create',
            CREATE_TEXT_BLOCK: '/blockchain/block/text',
            STATS: '/blockchain/stats',
            LIST: '/blockchain/list',
            BY_ID: (id) => `/blockchain/${id}`
        },
        FILE: {
            UPLOAD: '/file/upload',
            VALIDATE: '/file/validate',
            SUPPORTED_TYPES: '/file/supported-types',
            EXTRACT_TEXT: '/file/extract-text'
        },
        VALIDATION: {
            BLOCKCHAIN: '/validation/blockchain',
            BLOCK: (id) => `/validation/block/${id}`,
            INTEGRITY: '/validation/integrity',
            SIMULATE: '/validation/simulate',
            REPAIR: '/validation/repair'
        },
        CONFIG: {
            BASE: '/config',
            DIFFICULTY: '/config/difficulty',
            RESET: '/config/reset'
        },
        USERS: {
            POINTS: '/users/points',
            UPDATE_POINTS: (id) => `/users/points/${id}`,
            STATS: '/users/stats',
            GENERATE_RANDOM: '/users/generate-random',
            CLEAR: '/users/clear',
            BY_ID: (id) => `/users/${id}`
        },
        BLOCK: {
            BY_ID: (id) => `/block/${id}`,
            CONTENT: (id) => `/block/${id}/content`,
            LAST_HASH: (id) => `/block/blockchain/${id}/last-hash`
        }
    }
};

export default API_CONFIG;