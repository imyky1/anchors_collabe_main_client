import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Providers/Auth.tsx'
import { GeneralProvider } from './Providers/General.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <GeneralProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </GeneralProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
