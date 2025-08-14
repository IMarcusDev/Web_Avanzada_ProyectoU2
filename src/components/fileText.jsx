import { useState, useRef } from "react";
import "../styles/fileUpload.css"


export function ManejarCargaArchivo() {
    const [archivo, setArchivo] = useState(null);
    const [texto, setTexto] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        VerificarArchivo(archivo?.name || '');
                        VerificarTexto(texto);
                        setIsLoading(false);
                        setUploadProgress(0);
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setArchivo(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'text/plain')) {
            setArchivo(file);
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

    function VerificarArchivo(nombreArchivo) {
        if (!nombreArchivo || nombreArchivo.trim().length === 0) {
            alert("No se ha ingresado ningún archivo, intente de nuevo");
        } else {
            alert(`El archivo ${nombreArchivo} se ha cargado correctamente`);
        }
    }

    function VerificarTexto(texto) {
        if (texto.trim().length === 0) {
            alert("No se ingresó ningún comentario, intente de nuevo");
        } else {
            alert(`Comentario registrado correctamente: ${texto.substring(0, 50)}...`);
        }
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
                            />
                            <div className="textarea-footer">
                                <div className="char-counter">
                                    <span className={texto.length > 500 ? 'warning' : ''}>
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
                                <span>Procesando archivo...</span>
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