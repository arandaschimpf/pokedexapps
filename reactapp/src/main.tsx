import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "./contexto/context";
// import LoginForm from './forms/loginForm'
// import SignUpForm from './forms/signupForm'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <App/>
    </AuthProvider>
    {/* <LoginForm /> */}
  </React.StrictMode>,
)
