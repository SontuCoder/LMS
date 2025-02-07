import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import 'lenis/dist/lenis.css';
import LoginSignup from './Sections/LoginSignup.jsx';
import Courses from './Sections/Courses.jsx';

function Root() {
  const [login, setLogin] = useState(Boolean(localStorage.getItem("user")));

  const handleLogin = (user)=>{
    localStorage.setItem("user", user);
    setLogin(true);
  }

  const handleLogout = ()=>{
    localStorage.removeItem("user");
    setLogin(false);
    window.location.reload();
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<App isLogin={login} onLogout={handleLogout}/>} />
        <Route path="/login_signup" element={<LoginSignup onLogin={handleLogin} />} />
        <Route path="/courses" element={<Courses isLogin={login} onLogout={handleLogout}/>} />
      </Routes>
    </Router>
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root /> 
  </StrictMode>
);
