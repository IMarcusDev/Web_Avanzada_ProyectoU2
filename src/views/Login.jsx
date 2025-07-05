import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginView.css";
import userIcon from "../assets/login/user-icon.svg";
import inputIconUser from "../assets/login/input-icon-user.svg";


export const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/HomeView/welcomePage');
    };

    return(
        <>
        <div className="login-background">
            <section className="login-section">
                <div className="login-icon">
                    <img src={userIcon} alt="User Icon" />
                </div>
                <div className="login-container">
                    <div className="input-container">
                        <div className="input-field">
                            <div className="input-icon">
                                <img src={inputIconUser} alt="Input User Icon" />
                            </div>
                            <div>
                                <input type="Text" placeholder="Email"></input>
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <div className="input-field">
                            <div className="input-icon">
                                <img src={inputIconUser} alt="Input User Icon" />
                            </div>
                            <div>
                                <input type="Text" placeholder="Password"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-login">
                    <div>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </section>
        </div>
            
        </>
    );
}