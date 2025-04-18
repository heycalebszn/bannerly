import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './components/Form';
import GettingStarted from './pages/GettingStarted';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComingSoon from './components/ComingSoon';
import NotFound from './components/shared/NotFound.jsx';
import SignInComingSoon from './components/SignIn';
import Blog from './pages/Blog';
import Explore from './pages/Explore';
import Gallery from './pages/Gallery';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/get-started" element={<GettingStarted />} />
        <Route path="/form" element={<Form />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/sign-in" element={<SignInComingSoon />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>,
)
