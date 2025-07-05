import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { HashTable } from "./components/tableHash";
import { HomeView } from "./views/HomeView";

export const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/HomeView' element={<HomeView />}>
                    <Route path='chain' element={<HashTable />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}