import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { PokeApp } from './PokeApp';
import AuthComponent from './components/AuthComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthComponent />} />
        <Route path="/pokedex" element={<PokeApp />} />
      </Routes>
    </Router>
  );
}

export default App