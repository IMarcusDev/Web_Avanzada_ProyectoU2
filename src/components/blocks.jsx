import { useState } from 'react';
import "../styles/block.css";

export function Blocks({ initialChain }) {
    const [expandedBlock, setExpandedBlock] = useState(null);
    const [hoveredBlock, setHoveredBlock] = useState(null);

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

    const truncateHash = (hash, length = 12) => {
        return `${hash.substring(0, length)}...${hash.substring(hash.length - 8)}`;
    };

    return (
        <div className="blocks-container">
            {initialChain.map((bloque, i) => {
                const isExpanded = expandedBlock === i;
                const isHovered = hoveredBlock === i;
                const status = getBlockStatus(bloque, i);
                
                return (
                    <div
                        key={i}
                        className={`block-card ${status} ${isExpanded ? 'expanded' : ''} ${isHovered ? 'hovered' : ''}`}
                        onMouseEnter={() => setHoveredBlock(i)}
                        onMouseLeave={() => setHoveredBlock(null)}
                    >
                        
                        <div className="block-header" onClick={() => toggleExpand(i)}>
                            <div className="block-title">
                                <div className="block-number">
                                    <span className="block-hash-icon">
                                        <i className={`bi ${status === 'genesis' ? 'bi-star-fill' : status === 'valid' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                                    </span>
                                    <h2>Bloque #{bloque.index}</h2>
                                </div>
                                <div className="block-status">
                                    <span className={`status-badge ${status}`}>
                                        {status === 'genesis' ? 'Génesis' : status === 'valid' ? 'Válido' : 'Inválido'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="expand-button">
                                <i className={`bi ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                            </div>
                        </div>

                        
                        <div className="block-preview">
                            <div className="preview-item">
                                <span className="preview-label">Hash:</span>
                                <span className="preview-value hash-preview">
                                    {truncateHash(bloque.hash)}
                                </span>
                                <button 
                                    className="copy-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyToClipboard(bloque.hash, 'hash');
                                    }}
                                    title="Copiar hash"
                                >
                                    <i className="bi bi-clipboard"></i>
                                </button>
                            </div>
                            
                            {bloque.timestamp && (
                                <div className="preview-item">
                                    <span className="preview-label">Tiempo:</span>
                                    <span className="preview-value">
                                        {formatTimestamp(bloque.timestamp)}
                                    </span>
                                </div>
                            )}
                        </div>

                        
                        {isExpanded && (
                            <div className="block-details">
                                <div className="details-grid">
                                    <div className="detail-card">
                                        <div className="detail-header">
                                            <i className="bi bi-file-text"></i>
                                            <span>Datos</span>
                                        </div>
                                        <div className="detail-content">
                                            <span className="detail-value">{bloque.data}</span>
                                        </div>
                                    </div>

                                    <div className="detail-card">
                                        <div className="detail-header">
                                            <i className="bi bi-link-45deg"></i>
                                            <span>Hash Anterior</span>
                                            <button 
                                                className="copy-btn-small"
                                                onClick={() => copyToClipboard(bloque.previousHash, 'previousHash')}
                                                title="Copiar hash anterior"
                                            >
                                                <i className="bi bi-clipboard"></i>
                                            </button>
                                        </div>
                                        <div className="detail-content">
                                            <span className="detail-value hash-value">{bloque.previousHash}</span>
                                        </div>
                                    </div>

                                    <div className="detail-card">
                                        <div className="detail-header">
                                            <i className="bi bi-cpu"></i>
                                            <span>Nonce</span>
                                        </div>
                                        <div className="detail-content">
                                            <span className="detail-value nonce-value">{bloque.nonce}</span>
                                        </div>
                                    </div>

                                    <div className="detail-card full-width">
                                        <div className="detail-header">
                                            <i className="bi bi-fingerprint"></i>
                                            <span>Hash del Bloque</span>
                                            <button 
                                                className="copy-btn-small"
                                                onClick={() => copyToClipboard(bloque.hash, 'hash')}
                                                title="Copiar hash"
                                            >
                                                <i className="bi bi-clipboard"></i>
                                            </button>
                                        </div>
                                        <div className="detail-content">
                                            <span className="detail-value hash-value">{bloque.hash}</span>
                                        </div>
                                    </div>

                                    {bloque.timestamp && (
                                        <div className="detail-card">
                                            <div className="detail-header">
                                                <i className="bi bi-clock"></i>
                                                <span>Timestamp</span>
                                            </div>
                                            <div className="detail-content">
                                                <span className="detail-value timestamp-value">
                                                    {bloque.timestamp}
                                                </span>
                                                <small className="timestamp-readable">
                                                    {formatTimestamp(bloque.timestamp)}
                                                </small>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                
                                {i < initialChain.length - 1 && (
                                    <div className="block-connector">
                                        <div className="connector-line"></div>
                                        <div className="connector-arrow">
                                            <i className="bi bi-arrow-down"></i>
                                        </div>
                                        <div className="connector-label">
                                            Conectado con Bloque #{i + 1}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        
                        {!isExpanded && i < initialChain.length - 1 && (
                            <div className="simple-connector">
                                <div className="simple-line"></div>
                                <div className="simple-arrow">
                                    <i className="bi bi-arrow-down-short"></i>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}