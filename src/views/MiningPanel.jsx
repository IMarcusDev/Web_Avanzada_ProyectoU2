import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/mining.css';
import apiService from '../services/api';

export const MiningPanel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [miningContent, setMiningContent] = useState('');
    const [miningStats, setMiningStats] = useState(null);
    const [lastResult, setLastResult] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { user, isAuthenticated, refreshUser } = useAuth();

    useEffect(() => {
        console.log('MiningPanel - User:', user);
        console.log('MiningPanel - isAuthenticated:', isAuthenticated);
        console.log('MiningPanel - Token:', localStorage.getItem('token'));
        
        if (isAuthenticated) {
            loadStats();
        } else {
            console.log('Usuario no autenticado, no cargando estadísticas');
            showMessage('Debes estar autenticado para ver las estadísticas', 'error');
        }
    }, [isAuthenticated]);

    const loadStats = async () => {
        try {
            console.log('Cargando estadísticas de minado...');
            const data = await apiService.getMiningStats();
            console.log('Estadísticas recibidas:', data);
            setMiningStats(data);
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
            showMessage('Error al cargar estadísticas: ' + error.message, 'error');
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

    const startMining = async () => {
        if (!isAuthenticated) {
            showMessage('Debes estar autenticado para minar', 'error');
            return;
        }

        setIsLoading(true);
        setLastResult(null);

        try {
            const content = miningContent || `Bloque minado por ${user?.firstName} ${user?.lastName}`;
            console.log('Iniciando minado con contenido:', content);
            
            const data = await apiService.startMining(content);
            console.log('Resultado del minado:', data);

            if (data.success) {
                setLastResult(data);
                setMiningContent('');
                showMessage('¡Bloque minado exitosamente!', 'success');

                await refreshUser();
                await loadStats();
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error durante el minado:', error);
            showMessage(error.message || 'Error durante el minado', 'error');
            setLastResult({ success: false, error: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="mining-container">
                <div className="mining-header">
                    <h1>Centro de Minado</h1>
                    <p>Debes iniciar sesión para acceder al panel de minado</p>
                </div>
                <div className="message error">
                    Por favor, inicia sesión para usar esta funcionalidad
                </div>
            </div>
        );
    }

    return (
        <div className="mining-container">
            <div className="mining-header">
                <h1>Centro de Minado</h1>
                <p>Mina bloques y gana puntos por tu trabajo computacional</p>
                <small>Usuario actual: {user?.email}</small>
            </div>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <div className="mining-panel">
                <div className="mining-form">
                    <h3>Iniciar Minado</h3>
                    
                    <div className="form-group">
                        <label>Contenido del Bloque (Opcional):</label>
                        <textarea
                            value={miningContent}
                            onChange={(e) => setMiningContent(e.target.value)}
                            placeholder="Ingresa contenido personalizado o deja vacío..."
                            rows="3"
                            maxLength="500"
                            disabled={isLoading}
                        />
                        <small>{miningContent.length}/500 caracteres</small>
                    </div>

                    {miningStats ? (
                        <div className="mining-info">
                            <div className="info-grid">
                                <div className="info-item">
                                    <strong>Dificultad:</strong> 
                                    <span>{miningStats.networkStats?.currentDifficulty || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <strong>Recompensa:</strong> 
                                    <span>{miningStats.networkStats?.estimatedPointsReward || 'N/A'} puntos</span>
                                </div>
                                <div className="info-item">
                                    <strong>Objetivo:</strong> 
                                    <code>{miningStats.networkStats?.targetPrefix || '0000'}...</code>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="info-loading">
                            <p>Cargando información de red...</p>
                        </div>
                    )}

                    <button 
                        onClick={startMining}
                        disabled={isLoading || !isAuthenticated}
                        className="mining-btn"
                    >
                        {isLoading ? 'Minando...' : 'Iniciar Minado'}
                    </button>
                </div>

                {miningStats && miningStats.userStats && (
                    <div className="user-stats">
                        <h3>Tus Estadísticas</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-value">
                                    {miningStats.userStats.totalPoints || 0}
                                </span>
                                <span className="stat-label">Puntos Totales</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">
                                    {miningStats.userStats.blocksMined || 0}
                                </span>
                                <span className="stat-label">Bloques Minados</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">
                                    {miningStats.userStats.averagePointsPerBlock || 0}
                                </span>
                                <span className="stat-label">Promedio por Bloque</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">
                                    {miningStats.userStats.efficiency || 0}%
                                </span>
                                <span className="stat-label">Eficiencia</span>
                            </div>
                        </div>
                    </div>
                )}

                {lastResult && (
                    <div className={`mining-result ${lastResult.success ? 'success' : 'error'}`}>
                        {lastResult.success ? (
                            <div className="result-success">
                                <h4>¡Bloque Minado Exitosamente!</h4>
                                <div className="result-details">
                                    <p><strong>Bloque #:</strong> {lastResult.mining?.blockIndex}</p>
                                    <p><strong>Hash:</strong></p>
                                    <code className="result-hash">
                                        {lastResult.mining?.hash}
                                    </code>
                                    <button 
                                        className="copy-btn"
                                        onClick={() => navigator.clipboard.writeText(lastResult.mining?.hash)}
                                        title="Copiar hash"
                                    >
                                        Copiar Hash
                                    </button>
                                    <p><strong>Nonce:</strong> {lastResult.mining?.nonce?.toLocaleString()}</p>
                                    <p><strong>Puntos Ganados:</strong> +{lastResult.mining?.pointsEarned}</p>
                                </div>
                                
                                <div className="user-totals">
                                    <p>Total Puntos: {lastResult.user?.totalPoints}</p>
                                    <p>Bloques Minados: {lastResult.user?.blocksMined}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="result-error">
                                <h4>Error en el Minado</h4>
                                <p>{lastResult.error}</p>
                            </div>
                        )}
                    </div>
                )}

                <details style={{ marginTop: '2rem', fontSize: '0.8rem' }}>
                    <summary>Debug Info</summary>
                    <pre>{JSON.stringify({ 
                        isAuthenticated, 
                        hasToken: !!localStorage.getItem('token'),
                        user: user ? { email: user.email, id: user.id } : null,
                        miningStats 
                    }, null, 2)}</pre>
                </details>
            </div>
        </div>
    );
};