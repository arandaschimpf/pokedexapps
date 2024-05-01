import React from 'react'
import ReactDOM from 'react-dom/client'
import LOGIN from './pages/Login.tsx'
import App from './pages/Pokemon.tsx'
import SIGNUP from './pages/Signup.tsx'

import './index.css'
import App2 from './pages/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>,
)
