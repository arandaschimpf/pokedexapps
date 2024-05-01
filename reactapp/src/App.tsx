import React from 'react';
import Index from "./forms";
import Pokemones from "./sesion/main";
import { useAuth } from './contexto/context'; 

const App: React.FC = () => {
  const { isAuthenticated, authenticate } = useAuth();

  const handleLogout = () => {
    authenticate(false);
  };

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <div>
          <Pokemones />  
          <button onClick={handleLogout}>Logout</button> 
        </div>
      ) : ( 
        <Index/>
      )}
    </React.Fragment>
  );
};

export default App;
