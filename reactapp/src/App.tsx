import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Pokedex } from "./Pokedex";
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export default function App(){
return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Pokedex/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/admin" element={<SignUp/>}></Route>
        </Routes>
    </BrowserRouter>
)
}