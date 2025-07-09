import { Outlet, Link, useNavigate} from "react-router-dom";
import "../styles/HomeView.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const HomeView = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className="main-container">
                <section className="sideBar">
                    <ul>
                        <li className="display-2">
                            <Link to="welcomePage"><i className="bi bi-house"></i> Home</Link>
                        </li>
                        <li className="display-2">
                            <Link to="file"><i className="bi bi-upload"></i> Cargar archivo</Link>
                        </li>
                        <li className="display-2">
                            <Link to="chain"><i className="bi bi-link-45deg"></i> Listado Cadenas</Link>
                        </li>
                        <li className="display-2">
                            <Link to="AuditoriaPage"><i className="bi bi-journal-check"></i> Auditoria de la cadena</Link>
                        </li>
                        <li className="display-2">
                            <Link to="zeroPaddingConfig"><i className="bi bi-gear"></i> Configuración de número de ceros</Link>
                        </li>
                        <li className="display-2">
                            <Link to="DocumentationPage"><i className="bi bi-file-earmark-text"></i> Documentación</Link>
                        </li>
                        <li className="display-2">
                            <Link to="welcomePage"><i className="bi bi-house"></i> Mascotas Software</Link>
                        </li>
                        <li className="display-2">
                            <Link to="welcomePage"><i className="bi bi-list"></i> Listado de puntos</Link>
                        </li>
                    </ul>

                    <button className="display-2" onClick={() => navigate("/")}>
                        <i className="bi bi-box-arrow-right"></i> SALIR
                    </button>
                </section>
                <section className="container-componets">
                    <Outlet />
                </section>
            </div>
        </>
    )
}