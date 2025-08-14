import React, { useState } from 'react';
import { Blocks } from '../components/blocks';
import '../styles/auditoria.css';

const initialChain = [
    {
        index: 0,
        data: 'Bloque génesis',
        previousHash: '0',
        nonce: 512,
        hash: '0000a1b2c3d4e5f6g7h8i9j0',
        timestamp: Date.now() - 86400000,
        isValid: true
    },
    {
        index: 1,
        data: 'Transacción 1',
        previousHash: '0000a1b2c3d4e5f6g7h8i9j0',
        nonce: 123,
        hash: '0000b2c3d4e5f6g7h8i9j0a1',
        timestamp: Date.now() - 43200000,
        isValid: true
    },
    {
        index: 2,
        data: 'Transacción 2',
        previousHash: '0000b2c3d4e5f6g7h8i9j0a1',
        nonce: 456,
        hash: '0000c3d4e5f6g7h8i9j0a1b2',
        timestamp: Date.now(),
        isValid: true
    }
];

export const Auditoria = () => {
    const [mostrarCadena, setMostrarCadena] = useState(false);
    const [mensajeValidado, setMensajeValidado] = useState('');
    const [validationStatus, setValidationStatus] = useState('pending');
    const [chainData, setChainData] = useState(initialChain);
    const [validationProgress, setValidationProgress] = useState(0);
    const [validationDetails, setValidationDetails] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    const simulateValidation = async () => {
        setValidationStatus('validating');
        setValidationProgress(0);
        setValidationDetails([]);
        
        const validationSteps = [
            'Verificando estructura de bloques...',
            'Validando hashes...',
            'Comprobando enlaces entre bloques...',
            'Verificando timestamps...',
            'Validación completada'
        ];

        for (let i = 0; i < validationSteps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            setValidationProgress((i + 1) * 20);
            setValidationDetails(prev => [...prev, {
                step: i + 1,
                message: validationSteps[i],
                status: i < validationSteps.length - 1 ? 'completed' : 'final'
            }]);
        }

        const hasError = Math.random() < 0.2;
        if (hasError) {
            setValidationStatus('error');
            setMensajeValidado('Se encontraron inconsistencias en la cadena');
            setValidationDetails(prev => [...prev, {
                step: 6,
                message: 'Error: Hash inconsistente en el bloque #2',
                status: 'error'
            }]);
        } else {
            setValidationStatus('success');
            setMensajeValidado('Cadena validada correctamente - Integridad verificada');
        }
    };

    const handleMostrarCadena = () => {
        setMostrarCadena(!mostrarCadena);
        setMensajeValidado('');
        setValidationStatus('pending');
        setValidationProgress(0);
        setValidationDetails([]);
    };

    const generateNewBlock = () => {
        const newIndex = chainData.length;
        const lastBlock = chainData[chainData.length - 1];
        const newBlock = {
            index: newIndex,
            data: `Transacción ${newIndex}`,
            previousHash: lastBlock.hash,
            nonce: Math.floor(Math.random() * 1000),
            hash: `0000${Math.random().toString(36).substring(2, 15)}`,
            timestamp: Date.now(),
            isValid: true
        };
        
        setChainData([...chainData, newBlock]);
    };

    const getChainStats = () => {
        return {
            totalBlocks: chainData.length,
            totalTransactions: chainData.length - 1,
            averageBlockTime: chainData.length > 1 
                ? Math.round((chainData[chainData.length - 1].timestamp - chainData[0].timestamp) / (chainData.length - 1) / 1000)
                : 0,
            chainIntegrity: validationStatus === 'success' ? 100 : validationStatus === 'error' ? 85 : 'N/A'
        };
    };

    const stats = getChainStats();

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
                        <span className="stat-number">{stats.totalBlocks}</span>
                        <span className="stat-label">Bloques Totales</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon transaction-icon">
                        <i className="bi bi-arrow-left-right"></i>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{stats.totalTransactions}</span>
                        <span className="stat-label">Transacciones</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon time-icon">
                        <i className="bi bi-stopwatch"></i>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{stats.averageBlockTime}s</span>
                        <span className="stat-label">Tiempo Promedio</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon integrity-icon">
                        <i className="bi bi-shield-check"></i>
                    </div>
                    <div className="stat-info">
                        <span className="stat-number">{stats.chainIntegrity}%</span>
                        <span className="stat-label">Integridad</span>
                    </div>
                </div>
            </div>

            <div className="control-panel">
                <div className="primary-controls">
                    <button
                        onClick={handleMostrarCadena}
                        className={`btn btn-primary ${mostrarCadena ? 'active' : ''}`}
                    >
                        <i className={`bi ${mostrarCadena ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        {mostrarCadena ? 'Ocultar cadena' : 'Ver cadena'}
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
                        <span>{validationProgress}%</span>
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
                            <span className="info-item">
                                <i className="bi bi-clock-history"></i>
                                Último: {new Date(chainData[chainData.length - 1]?.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className="blocks-grid">
                        <Blocks initialChain={chainData} />
                    </div>
                </div>
            )}
        </div>
    );
};