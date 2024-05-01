import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir el tipo para el contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean; // Estado de autenticación
  error: string | null; // Estado para errores
  authenticate: (success: boolean, errorMsg?: string | null) => void; // Método para cambiar el estado de autenticación
}

// Crear el contexto con un tipo opcional para el valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definir las propiedades para el proveedor
interface AuthProviderProps {
  children: ReactNode; // Componentes hijos
}

// Crear un proveedor para el contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Estado para autenticación
  const [error, setError] = useState<string | null>(null); // Estado para errores

  const authenticate = (success: boolean, errorMsg: string | null = null) => {
    setIsAuthenticated(success);
    setError(errorMsg);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, error, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

// Función para usar el contexto de autenticación en otros componentes
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext debe ser utilizado dentro de un AuthProvider"); // Validación para evitar errores
  }
  return context; // Retorna el contexto
};
