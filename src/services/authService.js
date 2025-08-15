const API_BASE_URL = 'http://localhost:8080/api/v1';

class AuthService {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    async login(email, password) {
        try {
            console.log('Attempting login for:', email);
            
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Login response:', { success: data.success, status: response.status });

            if (response.ok && data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                
                console.log('Login successful, user:', this.user.email);
                return { success: true, user: this.user };
            } else {
                throw new Error(data.error || 'Error de autenticación');
            }
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            console.log('Attempting registration for:', userData.email);
            
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log('Registration response:', { success: data.success, status: response.status });

            if (response.ok && data.success) {
                return { success: true, user: data.user };
            } else {
                throw new Error(data.error || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }

    logout() {
        console.log('Logging out user:', this.user?.email);
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    isAuthenticated() {
        const hasToken = !!this.token;
        console.log('Checking authentication status:', hasToken);
        return hasToken;
    }

    getToken() {
        return this.token;
    }

    getUser() {
        return this.user;
    }

    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }

    async validateToken() {
        if (!this.token) {
            console.log('No token to validate');
            return false;
        }

        try {
            console.log('Validating token...');
            
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            console.log('Token validation response status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                const isValid = data.success;
                console.log('Token validation result:', isValid);
                
                if (isValid && data.user) {
                    this.user = data.user;
                    localStorage.setItem('user', JSON.stringify(this.user));
                }
                
                return isValid;
            } else {
                console.log('Token validation failed with status:', response.status);
                if (response.status === 401) {
                    this.logout();
                }
                return false;
            }
        } catch (error) {
            console.error('Error validando token:', error);
            this.logout();
            return false;
        }
    }

    async refreshUser() {
        if (!this.token) return null;
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: this.getAuthHeaders(),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.user) {
                    this.user = data.user;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    return this.user;
                }
            }
        } catch (error) {
            console.error('Error refreshing user:', error);
        }
        
        return this.user;
    }
}

export default new AuthService();