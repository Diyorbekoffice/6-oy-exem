import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Main from './components/Main';
import Deteils from './components/Deteils';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    } else {
      if (!location.pathname.includes('/register') && !location.pathname.includes('/login')) {
        navigate('/login');
      }
    }
  }, [location.pathname, navigate]);

  function Protect({ user, children }) {
    if (!user) {
      navigate('/login');
    }
    return children;
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Protect user={token}><Main><Home /></Main></Protect>} />
        <Route path='/books/:id' element={<Protect user={token}><Deteils /></Protect>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
