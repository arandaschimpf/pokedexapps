import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Pokedex from './pages/pokedex';
import { useEffect } from 'react';

//hacer el navigate despues, falta validar los forms
function App(){
  useEffect(() => {
    document.title = "React-App";
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Pokedex />} />
      </Routes>
    </Router>
  )
}

export default App;