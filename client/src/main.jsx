import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CMSProvider } from './context/CMSContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CMSProvider>
        <App />
      </CMSProvider>
    </ThemeProvider>
  </StrictMode>,
)
