import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { BrowserRouter} from 'react-router-dom'
import App from './App'

//Reenderizo mis componentes
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
)

