import { useState, useEffect, useContext, createContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authService.getUser());
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

    useEffect(() => {
        const checkAuth = async () => {
            console.log('Checking authentication status...');
            
            if (authService.isAuthenticated()) {
                console.log('Token found, validating...');
                const isValid = await authService.validateToken();
                setIsAuthenticated(isValid);
                setUser(isValid ? authService.getUser() : null);
                
                if (!isValid) {
                    console.log('Token validation failed, clearing auth');
                }
            } else {
                console.log('No token found');
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            console.log('AuthProvider: Attempting login...');
            const result = await authService.login(email, password);
            setUser(result.user);
            setIsAuthenticated(true);
            console.log('AuthProvider: Login successful');
            return result;
        } catch (error) {
            console.error('AuthProvider: Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            console.log('AuthProvider: Attempting registration...');
            const result = await authService.register(userData);
            console.log('AuthProvider: Registration successful');
            return result;
        } catch (error) {
            console.error('AuthProvider: Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        console.log('AuthProvider: Logging out...');
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const refreshUser = async () => {
        try {
            const updatedUser = await authService.refreshUser();
            if (updatedUser) {
                setUser(updatedUser);
            }
            return updatedUser;
        } catch (error) {
            console.error('AuthProvider: Error refreshing user:', error);
            return user;
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        refreshUser,
        getAuthHeaders: () => authService.getAuthHeaders(),
        getToken: () => authService.getToken(),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};