import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

export default function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path="/home" element ={<Home/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/signup" element ={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}