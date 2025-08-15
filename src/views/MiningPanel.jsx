import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/mining.css';
import { miningService } from '../services/miningService';


export const MiningPanel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [miningContent, setMiningContent] = useState('');
    const [miningStats, setMiningStats] = useState(null);
    const [lastMiningResult, setLastMiningResult] = useState(null);
    const { user, refreshUser } = useAuth();

    useEffect(() => {
        loadMiningStats();
    }, []);

    const loadMiningStats = async () => {
        try {
            const data = await miningService.getStats();
            setMiningStats(data);
        } catch (error) {
            console.error('Error al cargar estadísticas de minado:', error);
        }
    };


    const startMining = async () => {
        setIsLoading(true);
        setLastMiningResult(null);

        try {
            const data = await miningService.startMining(
                miningContent || `Bloque minado por ${user?.firstName} ${user?.lastName}`
            );

            if (data.success) {
                setLastMiningResult(data);
                setMiningContent('');
                await refreshUser();
                await loadMiningStats();
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error durante el minado:', error);
            setLastMiningResult({
                success: false,
                error: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="mining-container">
            <div className="mining-header">
                <h1 className="mining-title">Centro de Minado</h1>
                <p className="mining-subtitle">
                    Mina bloques y gana puntos por tu trabajo computacional
                </p>
            </div>

            <div className="mining-panel">
                <div className="mining-form">
                    <h3>Iniciar Minado</h3>
                    
                    <div className="form-group">
                        <label>Contenido del Bloque (Opcional):</label>
                        <textarea
                            value={miningContent}
                            onChange={(e) => setMiningContent(e.target.value)}
                            placeholder="Ingresa contenido personalizado o deja vacío para contenido automático..."
                            rows="3"
                            maxLength="500"
                            disabled={isLoading}
                        />
                        <small>{miningContent.length}/500 caracteres</small>
                    </div>

                    <div className="mining-info">
                        <div className="info-item">
                            <strong>Dificultad Actual:</strong> 
                            <span className="difficulty-badge">
                                {miningStats?.networkStats?.currentDifficulty || 'N/A'}
                            </span>
                        </div>
                        <div className="info-item">
                            <strong>Recompensa Estimada:</strong> 
                            <span className="reward-badge">
                                {miningStats?.networkStats?.estimatedPointsReward || 'N/A'} puntos
                            </span>
                        </div>
                        <div className="info-item">
                            <strong>Objetivo:</strong> 
                            <code className="target-hash">
                                {miningStats?.networkStats?.targetPrefix || '0000'}...
                            </code>
                        </div>
                    </div>

                    <button 
                        onClick={startMining}
                        disabled={isLoading}
                        className="mining-btn"
                    >
                        {isLoading ? (
                            <>
                                <div className="loading-spinner"></div>
                                <span>Minando...</span>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-play-circle"></i>
                                <span>Iniciar Minado</span>
                            </>
                        )}
                    </button>
                </div>

                {lastMiningResult && (
                    <div className={`mining-result ${lastMiningResult.success ? 'success' : 'error'}`}>
                        {lastMiningResult.success ? (
                            <div className="result-success">
                                <div className="result-header">
                                    <i className="bi bi-check-circle"></i>
                                    <h4>¡Bloque Minado Exitosamente!</h4>
                                </div>
                                <div className="result-details">
                                    <div className="detail-item">
                                        <strong>Bloque #:</strong> {lastMiningResult.mining.blockIndex}
                                    </div>
                                    <div className="detail-item">
                                        <strong>Hash:</strong> 
                                        <code className="result-hash">
                                            {lastMiningResult.mining.hash.substring(0, 16)}...
                                        </code>
                                        <button 
                                            className="copy-hash-btn"
                                            onClick={() => navigator.clipboard.writeText(lastMiningResult.mining.hash)}
                                            title="Copiar hash completo"
                                        >
                                            <i className="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Nonce:</strong> 
                                        <span className="nonce-value">{lastMiningResult.mining.nonce.toLocaleString()}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Dificultad:</strong> 
                                        <span className="difficulty-value">{lastMiningResult.mining.difficulty}</span>
                                    </div>
                                    <div className="detail-item highlight">
                                        <strong>Puntos Ganados:</strong> 
                                        <span className="points-earned">
                                            +{lastMiningResult.mining.pointsEarned}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="user-totals">
                                    <div className="total-item">
                                        <span className="total-label">Total Puntos:</span>
                                        <span className="total-value">{lastMiningResult.user.totalPoints}</span>
                                    </div>
                                    <div className="total-item">
                                        <span className="total-label">Bloques Minados:</span>
                                        <span className="total-value">{lastMiningResult.user.blocksMined}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="result-error">
                                <i className="bi bi-x-circle"></i>
                                <p>Error: {lastMiningResult.error}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};