import { useState } from 'react';
import "../styles/block.css";

export function Blocks({ initialChain }) {
    const [expandedBlock, setExpandedBlock] = useState(null);

    const toggleExpand = (index) => {
        setExpandedBlock(expandedBlock === index ? null : index);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const getBlockStatus = (block, index) => {
        if (index === 0) return 'genesis';
        if (block.isValid === false) return 'invalid';
        return 'valid';
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const shortenHash = (hash, startLength = 12, endLength = 8) => {
        if (!hash || hash.length <= startLength + endLength) return hash;
        return `${hash.substring(0, startLength)}...${hash.substring(hash.length - endLength)}`;
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'genesis':
                return { label: 'Génesis', icon: '⭐', className: 'genesis' };
            case 'valid':
                return { label: 'Válido', icon: '✓', className: 'valid' };
            case 'invalid':
                return { label: 'Inválido', icon: '✗', className: 'invalid' };
            default:
                return { label: 'Desconocido', icon: '?', className: 'unknown' };
        }
    };

    return (
        <div className="blocks-container">
            {initialChain.map((block, index) => {
                const isExpanded = expandedBlock === index;
                const status = getBlockStatus(block, index);
                const statusInfo = getStatusInfo(status);
                
                return (
                    <div key={index} className={`block-card ${statusInfo.className} ${isExpanded ? 'expanded' : ''}`}>
                        
                        {/* Encabezado del Bloque */}
                        <div className="block-header" onClick={() => toggleExpand(index)}>
                            <div className="block-title">
                                <span className="block-icon">{statusInfo.icon}</span>
                                <h3>Bloque #{block.index}</h3>
                                <span className={`status-badge ${statusInfo.className}`}>
                                    {statusInfo.label}
                                </span>
                            </div>
                            <button className="expand-btn">
                                {isExpanded ? '▲' : '▼'}
                            </button>
                        </div>

                        {/* Vista Previa */}
                        <div className="block-preview">
                            <div className="preview-item">
                                <label>Hash:</label>
                                <div className="hash-container">
                                    <code className="hash-preview">{shortenHash(block.hash)}</code>
                                    <button 
                                        className="copy-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(block.hash);
                                        }}
                                        title="Copiar hash completo"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                            
                            {block.timestamp && (
                                <div className="preview-item">
                                    <label>Fecha:</label>
                                    <span>{formatTimestamp(block.timestamp)}</span>
                                </div>
                            )}
                        </div>

                        {/* Detalles Expandidos */}
                        {isExpanded && (
                            <div className="block-details">
                                <div className="details-section">
                                    <h4>Información del Bloque</h4>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <label>Datos:</label>
                                            <div className="data-content">
                                                {block.data || 'Sin datos'}
                                            </div>
                                        </div>

                                        <div className="detail-item">
                                            <label>Hash Anterior:</label>
                                            <div className="hash-container">
                                                <code>{shortenHash(block.previousHash)}</code>
                                                <button 
                                                    className="copy-btn"
                                                    onClick={() => copyToClipboard(block.previousHash)}
                                                    title="Copiar hash anterior"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        </div>

                                        <div className="detail-item">
                                            <label>Nonce:</label>
                                            <span className="nonce-value">
                                                {block.nonce?.toLocaleString() || 0}
                                            </span>
                                        </div>

                                        <div className="detail-item">
                                            <label>Timestamp:</label>
                                            <div>
                                                <div>{block.timestamp}</div>
                                                <small>{formatTimestamp(block.timestamp)}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4>Hash Completo del Bloque</h4>
                                    <div className="full-hash-container">
                                        <code className="full-hash">{block.hash}</code>
                                        <button 
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(block.hash)}
                                            title="Copiar hash completo"
                                        >
                                            📋 Copiar Hash Completo
                                        </button>
                                    </div>
                                </div>

                                {/* Información de Validación */}
                                <div className="validation-info">
                                    <h4>Estado de Validación</h4>
                                    <div className={`validation-status ${statusInfo.className}`}>
                                        <span className="status-icon">{statusInfo.icon}</span>
                                        <span>Este bloque está {statusInfo.label.toLowerCase()}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Conexión al Siguiente Bloque */}
                        {index < initialChain.length - 1 && (
                            <div className="block-connector">
                                <div className="connector-line"></div>
                                <div className="connector-text">
                                    ↓ Conecta con Bloque #{index + 1}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}