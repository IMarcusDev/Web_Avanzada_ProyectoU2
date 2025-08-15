import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing user data:', error);
                logout();
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const result = await apiService.login(email, password);
            
            if (result.success) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                setUser(result.user);
                setIsAuthenticated(true);
                return result;
            } else {
                throw new Error(result.error || 'Error de login');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const result = await apiService.register(userData);
            if (result.success) {
                return result;
            } else {
                throw new Error(result.error || 'Error de registro');
            }
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    const refreshUser = async () => {
        if (!isAuthenticated) return null;
        
        try {
            const result = await apiService.getCurrentUser();
            if (result.success && result.user) {
                const updatedUser = result.user;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                return updatedUser;
            }
        } catch (error) {
            console.error('Error refreshing user:', error);
        }
        return user;
    };

    const getToken = () => localStorage.getItem('token');

    const getAuthHeaders = () => {
        const token = getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    return {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        refreshUser,
        getToken,
        getAuthHeaders
    };
};