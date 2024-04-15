import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'  //estilo empaquetado

ReactDOM.createRoot(document.getElementById('root')!).render( //elemento del html donde queremos crear/renderizar nuestra app
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
)
