import { Outlet, Link } from "react-router-dom";
import "../styles/HomeView.css";

export const HomeView = () => {
    return(
        <>
            <div className="main-container">
                <section className="sideBar">
                    <ul>
                        <li>
                            <Link to="">Home</Link>
                        </li>
                        <li>
                            <Link to="chain">Listado Cadenas</Link>
                        </li>
                    </ul>
                </section>
                <section className="container-componets">
                    <Outlet />
                </section>
            </div>
        </>
    )
}