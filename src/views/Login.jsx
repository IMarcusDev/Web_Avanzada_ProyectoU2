import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/LoginView.css";
import userIcon from "../assets/login/user-icon.svg";
import inputIconUser from "../assets/login/input-icon-user.svg";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const { login, register } = useAuth();
    const navigate = useNavigate();

    // Limpiar hashes al hacer login
    localStorage.removeItem("hashes");

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate('/HomeView/welcomePage');
        } catch (error) {
            setError(error.message || 'Error de autenticación');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await register(registerData);
            setShowRegister(false);
            setError('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        } catch (error) {
            setError(error.message || 'Error en el registro');
        } finally {
            setIsLoading(false);
        }
    };

    if (showRegister) {
        return (
            <div className="login-background">
                <section className="login-section">
                    <div className="login-icon">
                        <img src={userIcon} alt="User Icon" />
                    </div>
                    <h2 className="form-title">Registrarse</h2>
                    
                    <form onSubmit={handleRegister} className="login-container">
                        <div className="input-container">
                            <div className="input-field">
                                <div className="input-icon">
                                    <img src={inputIconUser} alt="Input User Icon" />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Nombre"
                                        value={registerData.firstName}
                                        onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="input-container">
                            <div className="input-field">
                                <div className="input-icon">
                                    <img src={inputIconUser} alt="Input User Icon" />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Apellido"
                                        value={registerData.lastName}
                                        onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="input-container">
                            <div className="input-field">
                                <div className="input-icon">
                                    <img src={inputIconUser} alt="Input User Icon" />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="Email"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="input-container">
                            <div className="input-field">
                                <div className="input-icon">
                                    <img src={inputIconUser} alt="Input User Icon" />
                                </div>
                                <div>
                                    <input 
                                        type="password" 
                                        placeholder="Password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="footer-login">
                            <button 
                                type="submit" 
                                className="display-2" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'REGISTRANDO...' : 'REGISTRAR'}
                            </button>
                            <button 
                                type="button" 
                                className="display-2 secondary" 
                                onClick={() => setShowRegister(false)}
                            >
                                VOLVER AL LOGIN
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        );
    }

    return (
        <div className="login-background">
            <section className="login-section">
                <div className="login-icon">
                    <img src={userIcon} alt="User Icon" />
                </div>
                <h2 className="form-title">Iniciar Sesión</h2>
                
                <form onSubmit={handleLogin} className="login-container">
                    <div className="input-container">
                        <div className="input-field">
                            <div className="input-icon">
                                <img src={inputIconUser} alt="Input User Icon" />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="input-container">
                        <div className="input-field">
                            <div className="input-icon">
                                <img src={inputIconUser} alt="Input User Icon" />
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="footer-login">
                        <button 
                            type="submit" 
                            className="display-2" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'INICIANDO...' : 'LOGIN'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};