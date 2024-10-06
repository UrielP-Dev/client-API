import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TopicsComponent from './App.tsx'
import Login from './Pages/Login.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login></Login>
  </StrictMode>,
)
