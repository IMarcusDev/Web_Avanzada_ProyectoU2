import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { HashTable } from "./components/tableHash";
import { HomeView } from "./views/HomeView";
import { Welcome } from "./components/welcome";
import { ManejarCargaArchivo } from "./components/fileText";
import { ManejarRellenoCeros } from "./components/numberZero";

export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/HomeView' element={<HomeView />}>
                    <Route path='welcomePage' element={<Welcome />} />
                    <Route path='chain' element={<HashTable />} />
                    <Route path="file" element={<ManejarCargaArchivo/>}/>
                    <Route path="zeroPaddingConfig" element={<ManejarRellenoCeros/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}