import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./views/Login";
import { HashTable } from "./components/tableHash";
import { HomeView } from "./views/HomeView";
import { Welcome } from "./views/Welcome";
import { ManejarCargaArchivo } from "./components/fileText";
import { ManejarRellenoCeros } from "./components/numberZero";
import { Auditoria } from "./views/Auditoria";
import { Documentation } from "./views/Documentation";
import { PetSoftware } from "./views/petSoftware";
import { PointsList } from "./views/PointsList";
import { MiningPanel } from "./views/MiningPanel";

export const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/HomeView' element={
                        <ProtectedRoute>
                            <HomeView />
                        </ProtectedRoute>
                    }>
                        <Route path='welcomePage' element={<Welcome />} />
                        <Route path='chain' element={<HashTable />} />
                        <Route path="file" element={<ManejarCargaArchivo/>}/>
                        <Route path="zeroPaddingConfig" element={<ManejarRellenoCeros/>}/>
                        <Route path="petSoftware" element={<PetSoftware></PetSoftware>}/>
                        <Route path="pointList" element={<PointsList></PointsList>}/>
                        <Route path="AuditoriaPage" element={<Auditoria/>}/>
                        <Route path="DocumentationPage" element={<Documentation/>}/>
                        <Route path="MiningPanel" element={<MiningPanel/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
    )
}