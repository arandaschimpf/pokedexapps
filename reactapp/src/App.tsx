import React from 'react';
import LoginForm from "./pages/login.tsx";
import SignupForm from "./pages/signup.tsx";
import PokemonsPage from "./pages/pokemons.tsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './pages/Auth';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/pokemons" element={isAuthenticated ? <PokemonsPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/pokemons" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
