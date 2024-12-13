import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './components/Form';
import GettingStarted from './pages/GettingStarted';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/get-started" element={<GettingStarted />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  </StrictMode>
)
