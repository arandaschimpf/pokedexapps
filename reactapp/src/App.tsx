// App.js
import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import AuthPage from "./AuthPage"
import Pokedex from "./pokedex";//pongamos que tienes una página llamada RegisterPage

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Pokedex />} />
        <Route path="/register" element={<AuthPage />} />
        
    </Routes>
    </BrowserRouter>
  );
}

export default App;
