export const Login = () => {
    return(
        <>
            <section className="login-section">
                <div className="login-icon">
                    <img src="./src/assets/login/user-icon.svg"></img>
                </div>
                <div className="login-container">
                    <div className="input-container">
                        <div className="input-field">
                            <div className="input-icon">
                                <img src="./src/assets/login/input-icon-user.svg"></img>
                            </div>
                            <div>
                                <input type="Text" placeholder="Email"></input>
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <div className="input-field">
                            <div className="input-icon">
                                <img src="./src/assets/login/input-icon-user.svg"></img>
                            </div>
                            <div>
                                <input type="Text" placeholder="Password"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-login">
                    <div>
                        <button>Login</button>
                    </div>
                </div>
            </section>
            
        </>
    );
}