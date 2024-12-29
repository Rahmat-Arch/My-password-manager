import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbbar from './components/Navbbar.jsx'

createRoot(document.getElementById('root')).render(
  <div>
      <Navbbar/>
      <App />
  </div>
    
)
