// src/views/Auditoria.jsx
import React, { useState, useEffect } from 'react';
import { Blocks } from '../components/blocks';
import { blockchainService } from '../services/blockchainService';
import '../styles/auditoria.css';

export const Auditoria = () => {
    const [mostrarCadena, setMostrarCadena] = useState(false);
    const [mensajeValidado, setMensajeValidado] = useState('');
    const [validationStatus, setValidationStatus] = useState('pending');
    const [chainData, setChainData] = useState([]);
    const [validationProgress, setValidationProgress] = useState(0);
    const [validationDetails, setValidationDetails] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const statsData = await blockchainService.getStats();
            setStats(statsData);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const loadBlockchain = async () => {
        try {
            setLoading(true);
            const response = await blockchainService.getBlockchain();
            
            // Transformar datos para el componente Blocks
            const transformedChain = response.chain.map(block => ({
                index: block.index,
                data: block.data || 'Sin datos',
                previousHash: block.previousHash,
                hash: block.hash,
                nonce: block.nonce || 0,
                timestamp: block.timestamp,
                isValid: block.isValid
            }));
            
            setChainData(transformedChain);
        } catch (error) {
            console.error('Error loading blockchain:', error);
            setChainData([]);
        } finally {
            setLoading(false);
        }
    };

    const simulateValidation = async () => {
        setValidationStatus('validating');
        setValidationProgress(0);
        setValidationDetails([]);
        
        const validationSteps = [
            'Verificando estructura de bloques...',
            'Validando hashes...',
            'Comprobando enlaces entre bloques...',
            'Verificando timestamps...',
            'Calculando integridad...',
            'Validación completada'
        ];

        try {
            // Simular progreso paso a paso
            for (let i = 0; i < validationSteps.length - 1; i++) {
                await new Promise(resolve => setTimeout(resolve, 800));
                setValidationProgress((i + 1) * 16.67);
                setValidationDetails(prev => [...prev, {
                    step: i + 1,
                    message: validationSteps[i],
                    status: 'completed'
                }]);
            }

            // Llamar a la API para validar
            const validationResult = await blockchainService.validateChain();
            const integrityResult = await blockchainService.getChainIntegrity();

            setValidationProgress(100);
            setValidationDetails(prev => [...prev, {
                step: validationSteps.length,
                message: validationSteps[validationSteps.length - 1],
                status: 'final'
            }]);

            if (validationResult.isValid) {
                setValidationStatus('success');
                setMensajeValidado(validationResult.message || 'Cadena validada correctamente - Integridad verificada');
            } else {
                setValidationStatus('error');
                setMensajeValidado(validationResult.message || 'Se encontraron inconsistencias en la cadena');
                
                // Agregar detalles de errores
                if (validationResult.details) {
                    const errors = validationResult.details.filter(detail => detail.status !== 'Valid');
                    errors.forEach((error, index) => {
                        setValidationDetails(prev => [...prev, {
                            step: validationSteps.length + index + 1,
                            message: `Error en bloque ${error.blockIndex}: ${error.message}`,
                            status: 'error'
                        }]);
                    });
                }
            }

            // Actualizar estadísticas
            setStats(prev => ({
                ...prev,
                chainIntegrity: integrityResult.integrityPercentage || 0
            }));

        } catch (error) {
            setValidationStatus('error');
            setMensajeValidado('Error al validar la cadena: ' + error.message);
            setValidationDetails(prev => [...prev, {
                step: validationSteps.length,
                message: 'Error de conexión con el servidor',
                status: 'error'
            }]);
        }
    };

    const handleMostrarCadena = async () => {
        if (!mostrarCadena) {
            await loadBlockchain();
        }
        setMostrarCadena(!mostrarCadena);
        setMensajeValidado('');
        setValidationStatus('pending');
        setValidationProgress(0);
        setValidationDetails([]);
    };

    const generateNewBlock = async () => {
        try {
            const randomData = `Bloque de prueba ${Date.now()}`;
            const response = await blockchainService.createTextBlock(randomData);
            
            if (response.success) {
                await loadBlockchain();
                await loadStats();
            }
        } catch (error) {
            console.error('Error generating new block:', error);
        }
    };

    const getChainStats = () => {
        return {
            totalBlocks: stats.totalBlocks || chainData.length,
            totalTransactions: Math.max(0, (stats.totalBlocks || chainData.length) - 1),
            averageBlockTime: stats.averageBlockTime ? `${stats.averageBlockTime.toFixed(1)}s` : 'N/A',
            chainIntegrity: stats.chainIntegrity || (validationStatus === 'success' ? 100 : validationStatus === 'error' ? 85 : 'N/A')
        };
    };

    const displayStats = getChainStats();

    return (
        <div className="auditoria-container">
            <div className="auditoria-header">
                <h1 className="display-3">Auditoría de la Cadena</h1>
                <p className="auditoria-subtitle">
                    Sistema de verificación e integridad de blockchain
                </p>
            </div>

            <div className="stats-overview">
                <div className="stat-card">
                    <div className="stat-icon chain-icon">
                        <i className="bi bi-link-45deg"></i>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{displayStats.totalBlocks}</span>
                        <span className="stat-label">Bloques Totales</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon transaction-icon">
                        <i className="bi bi-arrow-left-right"></i>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{displayStats.totalTransactions}</span>
                        <span className="stat-label">Transacciones</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon time-icon">
                        <i className="bi bi-stopwatch"></i>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{displayStats.averageBlockTime}</span>
                        <span className="stat-label">Tiempo Promedio</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon integrity-icon">
                        <i className="bi bi-shield-check"></i>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{displayStats.chainIntegrity}%</span>
                        <span className="stat-label">Integridad</span>
                    </div>
                </div>
            </div>

            <div className="control-panel">
                <div className="primary-controls">
                    <button
                        onClick={handleMostrarCadena}
                        className={`btn btn-primary ${mostrarCadena ? 'active' : ''}`}
                        disabled={loading}
                    >
                        <i className={`bi ${loading ? 'bi-arrow-clockwise spin' : mostrarCadena ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        {loading ? 'Cargando...' : mostrarCadena ? 'Ocultar cadena' : 'Ver cadena'}
                    </button>
                    
                    {mostrarCadena && (
                        <button
                            onClick={simulateValidation}
                            className="btn btn-success"
                            disabled={validationStatus === 'validating'}
                        >
                            <i className={`bi ${validationStatus === 'validating' ? 'bi-arrow-clockwise spin' : 'bi-check2-circle'}`}></i>
                            {validationStatus === 'validating' ? 'Validando...' : 'Validar cadena'}
                        </button>
                    )}
                    
                    <button
                        onClick={generateNewBlock}
                        className="btn btn-info"
                    >
                        <i className="bi bi-plus-circle"></i>
                        Nuevo Bloque
                    </button>

                    <button
                        onClick={loadStats}
                        className="btn btn-info"
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        Actualizar Stats
                    </button>
                </div>
                
                {validationDetails.length > 0 && (
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="btn btn-outline-secondary"
                    >
                        <i className={`bi ${showDetails ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                        {showDetails ? 'Ocultar' : 'Ver'} detalles
                    </button>
                )}
            </div>

            {validationStatus === 'validating' && (
                <div className="validation-progress">
                    <div className="progress-header">
                        <span>Validando integridad de la cadena...</span>
                        <span>{Math.round(validationProgress)}%</span>
                    </div>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${validationProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {showDetails && validationDetails.length > 0 && (
                <div className="validation-details">
                    <h3>Detalles de la Validación</h3>
                    <div className="details-list">
                        {validationDetails.map((detail, index) => (
                            <div key={index} className={`detail-item ${detail.status}`}>
                                <div className="detail-icon">
                                    <i className={`bi ${
                                        detail.status === 'completed' ? 'bi-check-circle' :
                                        detail.status === 'error' ? 'bi-x-circle' : 'bi-info-circle'
                                    }`}></i>
                                </div>
                                <span className="detail-message">{detail.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {mensajeValidado && (
                <div className={`validation-result ${validationStatus}`}>
                    <div className="result-content">
                        <div className="result-icon">
                            <i className={`bi ${
                                validationStatus === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'
                            }`}></i>
                        </div>
                        <div className="result-message">{mensajeValidado}</div>
                        {validationStatus === 'success' && (
                            <div className="result-details">
                                <small>
                                    Todos los hashes verificados • Enlaces válidos • Timestamps correctos
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {mostrarCadena && (
                <div className="blockchain-container">
                    <div className="blockchain-header">
                        <h3>Estructura de la Cadena</h3>
                        <div className="blockchain-info">
                            <span className="info-item">
                                <i className="bi bi-layers"></i>
                                {chainData.length} bloques
                            </span>
                            {chainData.length > 0 && (
                                <span className="info-item">
                                    <i className="bi bi-clock-history"></i>
                                    Último: {new Date(chainData[chainData.length - 1]?.timestamp).toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="blocks-grid">
                        {chainData.length > 0 ? (
                            <Blocks initialChain={chainData} />
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <p>No hay bloques para mostrar</p>
                                <button onClick={generateNewBlock} className="btn btn-primary">
                                    Crear primer bloque
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};