import { Outlet, Link, useNavigate} from "react-router-dom";
import "../styles/HomeView.css";

export const HomeView = () => {
    const navigate = useNavigate();
    return(
        <>
            <div className="main-container">
                <section className="sideBar">
                    <ul>
                        <li>
                            <Link to="welcomePage">Home</Link>
                        </li>
                        <li>
                            <Link to="welcomePage">Cargar archivo</Link>
                        </li>
                        <li>
                            <Link to="chain">Listado Cadenas</Link>
                        </li>
                        <li>
                             <Link to="welcomePage">Auditoria de la cadena</Link>
                        </li>
                        <li>
                            <Link to="welcomePage">Configuración de número de ceros</Link>
                        </li>
                        <li>
                            <Link to="welcomePage">Documentación</Link>
                        </li>
                        <li>
                            <Link to="welcomePage">Mascotas Software</Link>
                        </li>
                        <li>
                            <Link to="welcomePage">Listado de puntos</Link>
                        </li>
                    </ul>

                    <button onClick={() => navigate("/")}>
                        Salir
                    </button>
                </section>
                <section className="container-componets">
                    <Outlet />
                </section>
            </div>
        </>
    )
}