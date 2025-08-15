import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import apiService from "../services/api";

export function ManejarRellenoCeros() {
    const [ceros, setCeros] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentConfig, setCurrentConfig] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        loadCurrentConfig();
    }, []);

    const loadCurrentConfig = async () => {
        try {
            const config = await apiService.getCurrentConfig();
            setCurrentConfig(config);
            setCeros(config.difficulty.toString());
        } catch (error) {
            console.error('Error cargando configuración:', error);
        }
    };

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
            showMessage('Debes estar autenticado para cambiar la configuración', 'error');
            return;
        }

        if (!ceros.trim() || isNaN(ceros) || parseInt(ceros) < 1 || parseInt(ceros) > 10) {
            showMessage('Ingresa un número válido entre 1 y 10', 'error');
            return;
        }

        setIsLoading(true);

        try {
            const result = await apiService.updateDifficulty(parseInt(ceros));
            showMessage(result.message || `Dificultad actualizada a ${ceros} ceros`, 'success');
            await loadCurrentConfig();
        } catch (error) {
            console.error('Error:', error);
            showMessage(error.message || 'Error al actualizar la configuración', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const resetConfig = async () => {
        if (!isAuthenticated) {
            showMessage('Debes estar autenticado para resetear la configuración', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const result = await apiService.resetConfig();
            showMessage(result.message || 'Configuración reseteada al valor por defecto', 'success');
            await loadCurrentConfig();
        } catch (error) {
            console.error('Error:', error);
            showMessage(error.message || 'Error al resetear la configuración', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="zero-config-form">
                <div className="error-message">
                    Debes iniciar sesión para acceder a esta funcionalidad
                </div>
            </div>
        );
    }

    return (
        <div className="zero-config-form">
            <form onSubmit={onSubmit} className="form-glass">
                <p className="form-title display-6">CONFIGURACIÓN DE NÚMEROS DE CEROS</p>
                
                {currentConfig && (
                    <div className="current-config">
                        <div className="config-info">
                            <h4>Configuración Actual</h4>
                            <div className="config-grid">
                                <div className="config-item">
                                    <span className="config-label">Dificultad actual:</span>
                                    <span className="config-value">{currentConfig.difficulty}</span>
                                </div>
                                <div className="config-item">
                                    <span className="config-label">Dificultad por defecto:</span>
                                    <span className="config-value">{currentConfig.defaultDifficulty}</span>
                                </div>
                                <div className="config-item">
                                    <span className="config-label">Prefijo objetivo:</span>
                                    <span className="config-value hash-display">{currentConfig.targetPrefix}</span>
                                </div>
                                <div className="config-item">
                                    <span className="config-label">Recompensa de minado:</span>
                                    <span className="config-value">{currentConfig.miningReward}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {message && (
                    <div className={`${messageType}-message`}>
                        {message}
                    </div>
                )}
                
                <div className="input-group">
                    <label htmlFor="numeroCeros" className="form-label">
                        Ingrese el número de ceros que desea colocar (1-10)
                    </label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-hash"></i>
                            Número de ceros:
                        </span>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Ej: 4" 
                            aria-label="Numero de ceros" 
                            aria-describedby="basic-addon1" 
                            min="1"
                            max="10"
                            value={ceros}
                            onChange={(event) => setCeros(event.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="difficulty-preview">
                        <small className="text-muted">
                            Vista previa del hash objetivo: <code>{ceros ? '0'.repeat(parseInt(ceros) || 0) + '...' : '0000...'}</code>
                        </small>
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading && <span className="loading-spinner"></span>}
                        <i className="bi bi-gear"></i>
                        {isLoading ? 'Configurando...' : 'Actualizar'}
                    </button>
                    
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={resetConfig}
                        disabled={isLoading}
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        Resetear
                    </button>
                </div>
            </form>
        </div>
    )
}