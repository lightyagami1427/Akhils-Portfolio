import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted fonts, so nothing is fetched from Google Fonts
import '@fontsource-variable/bricolage-grotesque/wdth.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/caveat/latin-600.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
