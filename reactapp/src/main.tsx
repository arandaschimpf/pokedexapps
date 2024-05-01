import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import App from './App1'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain="pabloolariaga.us.auth0.com"
      clientId="KSh5Hozn04u9Qq0FrxLi5OKqjY5YScaw"
      
    >
      <App/>
    </Auth0Provider> */}
    <App />
  </React.StrictMode>,
)
