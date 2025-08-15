// src/views/PointsList.jsx
import React, { useState, useEffect } from "react";
import { userService } from "../services/userService";
import "../styles/points.css";

export const PointsList = () => {
    const [personas, setPersonas] = useState([]);
    const [filteredPersonas, setFilteredPersonas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('points');
    const [sortOrder, setSortOrder] = useState('desc');
    const [showStats, setShowStats] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUsersWithPoints();
    }, []);

    const loadUsersWithPoints = async () => {
        try {
            setLoading(true);
            const users = await userService.getUsersWithPoints();
            setPersonas(users);
            setFilteredPersonas(users);
            setError('');
        } catch (error) {
            console.error('Error loading users:', error);
            setError('Error al cargar usuarios. Verifique que el servidor esté funcionando.');
            setPersonas([]);
            setFilteredPersonas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = personas.filter(persona => 
            (persona.name && persona.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (persona.surname && persona.surname.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (persona.chain && persona.chain.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        filtered.sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];
            
            if (sortBy === 'fullName') {
                aVal = `${a.name} ${a.surname}`;
                bVal = `${b.name} ${b.surname}`;
            }
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        setFilteredPersonas(filtered);
    }, [personas, searchTerm, sortBy, sortOrder]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const generateRandomData = async () => {
        try {
            const response = await userService.generateRandomUsers(5);
            if (response.success) {
                await loadUsersWithPoints(); // Recargar la lista
            } else {
                setError(response.error || 'Error al generar usuarios');
            }
        } catch (error) {
            console.error('Error generating random users:', error);
            setError('Error al generar usuarios aleatorios');
        }
    };

    const exportData = () => {
        const csvContent = [
            ['ID', 'Nombre', 'Apellido', 'Puntos', 'Eficiencia', 'Estado', 'Cadena'],
            ...filteredPersonas.map(p => [
                p.id, p.name, p.surname, p.point, p.efficiency, p.status, p.chain
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `points_data_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const clearAllData = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar todos los datos?')) {
            try {
                const response = await userService.clearAllUsers();
                if (response.success) {
                    await loadUsersWithPoints();
                } else {
                    setError(response.error || 'Error al limpiar usuarios');
                }
            } catch (error) {
                console.error('Error clearing users:', error);
                setError('Error al limpiar todos los usuarios');
            }
        }
    };

    const getStats = async () => {
        try {
            const statsData = await userService.getUserStats();
            return {
                avg: statsData.averagePoints || 0,
                max: statsData.maxPoints || 0,
                min: 0,
                total: statsData.totalPoints || 0,
                count: statsData.totalUsers || 0
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            if (filteredPersonas.length === 0) return { avg: 0, max: 0, min: 0, total: 0, count: 0 };
            
            const points = filteredPersonas.map(p => p.point || 0);
            return {
                avg: (points.reduce((a, b) => a + b, 0) / points.length).toFixed(1),
                max: Math.max(...points),
                min: Math.min(...points),
                total: points.reduce((a, b) => a + b, 0),
                count: filteredPersonas.length
            };
        }
    };

    const [stats, setStats] = useState({ avg: 0, max: 0, min: 0, total: 0, count: 0 });

    useEffect(() => {
        const updateStats = async () => {
            const newStats = await getStats();
            setStats(newStats);
        };
        updateStats();
    }, [filteredPersonas]);

    if (loading) {
        return (
            <div className="points-container">
                <div className="loading-container">
                    <div className="loading-spinner-lg"></div>
                    <p>Cargando datos de puntos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="points-container">
            <div className="points-header">
                <h1 className="points-title">Listado de Puntos</h1>
                <p className="points-subtitle">Sistema de seguimiento y análisis de puntos blockchain</p>
            </div>

            {error && (
                <div className="error-banner" style={{
                    backgroundColor: 'rgba(245, 87, 108, 0.1)',
                    border: '1px solid rgba(245, 87, 108, 0.3)',
                    color: '#721c24',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    {error}
                    <button 
                        onClick={loadUsersWithPoints}
                        style={{
                            marginLeft: '1rem',
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Reintentar
                    </button>
                </div>
            )}

            <div className="points-toolbar">
                <div className="search-container">
                    <i className="bi bi-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="Buscar por nombre, apellido o cadena..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                <div className="toolbar-buttons">
                    <button 
                        onClick={() => setShowStats(!showStats)}
                        className="btn btn-info"
                        title="Ver estadísticas"
                    >
                        <i className="bi bi-graph-up"></i>
                        Stats
                    </button>
                    <button 
                        onClick={generateRandomData}
                        className="btn btn-success"
                        title="Generar datos aleatorios"
                    >
                        <i className="bi bi-plus-lg"></i>
                        Generar
                    </button>
                    <button 
                        onClick={exportData}
                        className="btn btn-primary"
                        title="Exportar a CSV"
                    >
                        <i className="bi bi-download"></i>
                        Exportar
                    </button>
                    <button 
                        onClick={clearAllData}
                        className="btn btn-danger"
                        title="Limpiar todos los datos"
                    >
                        <i className="bi bi-trash"></i>
                        Limpiar
                    </button>
                    <button 
                        onClick={loadUsersWithPoints}
                        className="btn btn-info"
                        title="Recargar datos"
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        Recargar
                    </button>
                </div>
            </div>

            {showStats && (
                <div className="stats-panel">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon total-icon">
                                <i className="bi bi-people"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.count}</div>
                                <div className="stat-label">Total Usuarios</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon avg-icon">
                                <i className="bi bi-bar-chart"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.avg}</div>
                                <div className="stat-label">Promedio Puntos</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon max-icon">
                                <i className="bi bi-trophy"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.max}</div>
                                <div className="stat-label">Máximo Puntos</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon total-points-icon">
                                <i className="bi bi-gem"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.total}</div>
                                <div className="stat-label">Total Puntos</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="points-grid">
                {filteredPersonas.length > 0 ? (
                    filteredPersonas.map((persona, index) => (
                        <div key={persona.id} className="point-card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="card-header">
                                <img 
                                    src={persona.avatar || `https://ui-avatars.com/api/?name=${persona.name}+${persona.surname}&background=667eea&color=fff&size=40`} 
                                    alt={`${persona.name} ${persona.surname}`}
                                    className="user-avatar"
                                />
                                <div className="user-info">
                                    <h3 className="user-name">{persona.name} {persona.surname}</h3>
                                    <p className="user-id">ID: {persona.id}</p>
                                </div>
                                <div className="points-display">
                                    <span className="points-number">{persona.point || 0}</span>
                                    <span className="points-label">puntos</span>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="status-row">
                                    <span className={`status-badge ${persona.status || 'medium'}`}>
                                        {persona.status === 'high' ? 'Alto' : 
                                         persona.status === 'medium' ? 'Medio' : 'Bajo'}
                                    </span>
                                    <div className="efficiency-display">
                                        <span className="efficiency-text">{persona.efficiency || 0}% eficiencia</span>
                                        <div className="efficiency-bar">
                                            <div 
                                                className="efficiency-fill" 
                                                style={{ width: `${persona.efficiency || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="chain-info">
                                    <label className="chain-label">Cadena Semilla:</label>
                                    <div className="chain-display">
                                        <code className="chain-hash">
                                            {persona.chain ? 
                                                `${persona.chain.substring(0, 12)}...${persona.chain.substring(persona.chain.length - 8)}` :
                                                'N/A'
                                            }
                                        </code>
                                        {persona.chain && (
                                            <button 
                                                className="copy-btn"
                                                onClick={() => navigator.clipboard.writeText(persona.chain)}
                                                title="Copiar hash completo"
                                            >
                                                <i className="bi bi-clipboard"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button 
                                        className="action-btn view-btn"
                                        onClick={() => setSelectedPersona(persona)}
                                        title="Ver detalles"
                                    >
                                        <i className="bi bi-eye"></i>
                                        Ver
                                    </button>
                                    <button 
                                        className="action-btn edit-btn"
                                        title="Editar"
                                        onClick={() => {
                                            console.log('Editar usuario:', persona.id);
                                        }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-data-message">
                        <div className="no-data-content">
                            <i className="bi bi-inbox"></i>
                            <p>No hay datos para mostrar</p>
                            <button onClick={generateRandomData} className="btn btn-outline-primary btn-sm">
                                Generar datos de ejemplo
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {selectedPersona && (
                <div className="modal-overlay" onClick={() => setSelectedPersona(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Detalles del Usuario</h3>
                            <button 
                                className="modal-close"
                                onClick={() => setSelectedPersona(null)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="user-profile">
                                <img 
                                    src={selectedPersona.avatar || `https://ui-avatars.com/api/?name=${selectedPersona.name}+${selectedPersona.surname}&background=667eea&color=fff&size=80`} 
                                    alt={`${selectedPersona.name} ${selectedPersona.surname}`}
                                    className="profile-avatar"
                                />
                                <div className="profile-info">
                                    <h4>{selectedPersona.name} {selectedPersona.surname}</h4>
                                    <p>ID: #{selectedPersona.id}</p>
                                </div>
                            </div>
                            
                            <div className="details-grid">
                                <div className="detail-item">
                                    <label>Puntos:</label>
                                    <span className="detail-value">{selectedPersona.point || 0}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Eficiencia:</label>
                                    <span className="detail-value">{selectedPersona.efficiency || 0}%</span>
                                </div>
                                <div className="detail-item">
                                    <label>Estado:</label>
                                    <span className={`status-badge ${selectedPersona.status || 'medium'}`}>
                                        {selectedPersona.status === 'high' ? 'Alto' : 
                                         selectedPersona.status === 'medium' ? 'Medio' : 'Bajo'}
                                    </span>
                                </div>
                                <div className="detail-item full-width">
                                    <label>Cadena Semilla:</label>
                                    <div className="chain-detail">
                                        <code>{selectedPersona.chain || 'N/A'}</code>
                                        {selectedPersona.chain && (
                                            <button 
                                                className="copy-chain-btn"
                                                onClick={() => navigator.clipboard.writeText(selectedPersona.chain)}
                                            >
                                                <i className="bi bi-clipboard"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label>Fecha:</label>
                                    <span className="detail-value">
                                        {selectedPersona.timestamp ? 
                                            new Date(selectedPersona.timestamp).toLocaleString() :
                                            'N/A'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {filteredPersonas.length > 0 && (
                <div className="points-footer">
                    <div className="results-info">
                        Mostrando {filteredPersonas.length} de {personas.length} usuarios
                        {searchTerm && ` para "${searchTerm}"`}
                    </div>
                </div>
            )}
        </div>
    );
};