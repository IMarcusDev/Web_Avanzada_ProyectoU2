import { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import apiService from "../services/apiService";
import "../styles/fileUpload.css";

export function ManejarCargaArchivo() {
    const [archivo, setArchivo] = useState(null);
    const [texto, setTexto] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const fileInputRef = useRef(null);
    const { isAuthenticated } = useAuth();

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        if (!isAuthenticated) {
            showMessage('Debes estar autenticado para subir archivos', 'error');
            return;
        }

        if (!archivo && !texto.trim()) {
            showMessage('Debes proporcionar un archivo o texto', 'error');
            return;
        }

        setIsLoading(true);
        setUploadProgress(0);

        try {
            let result;
            
            if (archivo) {
                // Subir archivo
                result = await apiService.uploadFile(archivo, texto);
                showMessage(`Archivo ${archivo.name} procesado exitosamente como bloque #${result.blockIndex}`, 'success');
            } else if (texto.trim()) {
                // Crear bloque de texto
                result = await apiService.createTextBlock(texto);
                showMessage(`Texto procesado exitosamente como bloque #${result.blockIndex}`, 'success');
            }

            setArchivo(null);
            setTexto('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            console.error('Error:', error);
            showMessage(error.message || 'Error al procesar la solicitud', 'error');
        } finally {
            setIsLoading(false);
            setUploadProgress(0);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const validateAndSetFile = (file) => {
        const allowedTypes = ['application/pdf', 'text/plain'];
        const maxSize = 10 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            showMessage('Solo se permiten archivos PDF y TXT', 'error');
            return;
        }

        if (file.size > maxSize) {
            showMessage('El archivo excede el tamaño máximo de 10MB', 'error');
            return;
        }

        setArchivo(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const removeFile = () => {
        setArchivo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getFileIcon = (file) => {
        if (!file) return 'bi-file-earmark';
        if (file.type === 'application/pdf') return 'bi-file-earmark-pdf';
        if (file.type === 'text/plain') return 'bi-file-earmark-text';
        return 'bi-file-earmark';
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (!isAuthenticated) {
        return (
            <div className="upload-container">
                <div className="error-message">
                    Debes iniciar sesión para acceder a esta funcionalidad
                </div>
            </div>
        );
    }

    return (
        <div className="upload-container">
            <div className="upload-wrapper">
                <form onSubmit={onSubmit} className="upload-form">
                    <div className="form-header">
                        <div className="header-icon">
                            <i className="bi bi-cloud-upload"></i>
                        </div>
                        <h1 className="form-title">Ingreso de Archivo</h1>
                        <p className="form-subtitle">
                            Suba un archivo PDF o TXT para procesarlo en la blockchain
                        </p>
                    </div>

                    {message && (
                        <div className={`${messageType}-message`}>
                            {message}
                        </div>
                    )}
                    
                    <div className="file-section">
                        <label className="section-label">
                            <i className="bi bi-file-earmark-arrow-up"></i>
                            Seleccionar Archivo
                        </label>
                        
                        <div 
                            className={`file-dropzone ${isDragOver ? 'drag-over' : ''} ${archivo ? 'has-file' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".txt,.pdf"
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            
                            {!archivo ? (
                                <div className="dropzone-content">
                                    <div className="dropzone-icon">
                                        <i className="bi bi-cloud-arrow-up"></i>
                                    </div>
                                    <div className="dropzone-text">
                                        <p className="primary-text">
                                            Arrastra tu archivo aquí o <span className="click-text">haz clic para seleccionar</span>
                                        </p>
                                        <p className="secondary-text">
                                            Archivos soportados: PDF, TXT (máx. 10MB)
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="file-preview">
                                    <div className="file-info">
                                        <div className="file-icon">
                                            <i className={`bi ${getFileIcon(archivo)}`}></i>
                                        </div>
                                        <div className="file-details">
                                            <p className="file-name">{archivo.name}</p>
                                            <p className="file-size">{formatFileSize(archivo.size)}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-file"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile();
                                        }}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="comment-section">
                        <label className="section-label">
                            <i className="bi bi-chat-left-text"></i>
                            Agregar Comentario
                        </label>
                        
                        <div className="textarea-container">
                            <textarea
                                className="comment-textarea"
                                placeholder="Describe el contenido del archivo, su propósito o cualquier información relevante para la blockchain..."
                                value={texto}
                                onChange={(event) => setTexto(event.target.value)}
                                rows="6"
                                maxLength="500"
                            />
                            <div className="textarea-footer">
                                <div className="char-counter">
                                    <span className={texto.length > 450 ? 'warning' : ''}>
                                        {texto.length}/500
                                    </span>
                                </div>
                                <div className="textarea-tools">
                                    <button
                                        type="button"
                                        className="tool-btn"
                                        onClick={() => setTexto('')}
                                        title="Limpiar texto"
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="progress-section">
                            <div className="progress-info">
                                <span>Procesando en blockchain...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className="submit-section">
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isLoading || (!archivo && !texto.trim())}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send"></i>
                                    Enviar a Blockchain
                                </>
                            )}
                        </button>
                        
                        <p className="submit-info">
                            Al enviar, el archivo será procesado y agregado como un nuevo bloque en la cadena
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}