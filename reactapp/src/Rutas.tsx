import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
export default function Rutas() {
    return(
        <>
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/SignUp' element={<SignUp />} />
            </Routes>
        </Router>
    
        </>
    );
}