import api from './api';

export const fileService = {
    uploadFile: async (file, comment = '', blockchainId = null) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (comment) formData.append('comment', comment);
            if (blockchainId) formData.append('blockchainId', blockchainId);

            const response = await api.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al subir archivo: ' + error.message);
        }
    },

    validateFile: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/file/validate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al validar archivo: ' + error.message);
        }
    },

    getSupportedFileTypes: async () => {
        try {
            const response = await api.get('/file/supported-types');
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener tipos soportados: ' + error.message);
        }
    },

    extractText: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/file/extract-text', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al extraer texto: ' + error.message);
        }
    }
};