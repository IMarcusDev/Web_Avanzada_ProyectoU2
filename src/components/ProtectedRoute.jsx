import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column'
            }}>
                <div className="loading-spinner" style={{
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    animation: 'spin 2s linear infinite'
                }}></div>
                <p style={{ marginTop: '1rem' }}>Verificando autenticación...</p>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
};