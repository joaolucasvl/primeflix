import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Header from "./components/Header";
import Error from "./pages/Error";
import Favorito from "./pages/Favorito";


function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element = { <Home/> } />
                <Route path="/Filme/:id" element = { <Filme/> } />
                <Route path="/Favorito" element = { <Favorito/> } />


                <Route path="*" element = { <Error/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;