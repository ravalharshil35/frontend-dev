import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MyComponent from './MyComponant.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <MyComponent></MyComponent>
  </StrictMode>,
)
