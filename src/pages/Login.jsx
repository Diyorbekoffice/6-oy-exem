import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axi from '../../axios';

function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);

    if (!email || !password) {
      alert('Barcha maydonlarni tuldiring.');
      setLoading(false);
      return;
    }

    axi.post('https://fn27.vimlc.uz/login', {
      email,
      password,
    })
    .then((response) => {
      alert('Muvaffaqiyatli kirildi.');
      console.log(response.data);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', response.data.user);
      
      navigate('/');
    })
    .catch(error => {
      console.error('Xatolik yuz berdi:', error);
      alert('Kirishda xatolik yuz berdi. Iltimos, qayta urinib kuring.');
    })
    .finally(() => {
      setLoading(false); 
    });
  };

  return (
    <div className="flex justify-center mt-20">
      
      <div className="flex flex-col w-[400px] bg-green-500 p-5 gap-7 rounded-lg">
        <h3 className="text-center font-bold text-yellow-100">Login</h3>
        <input ref={emailRef} className="p-3 rounded-md w-full" type="email" placeholder="Enter email.." />
        <input ref={passwordRef} className="p-3 rounded-md w-full" type="password" placeholder="Enter passwors..." />
        <Link className='text-blue-700 underline ' to='/register'>Are you unregistered?</Link>
        <button onClick={handleSubmit} className="p-3 rounded-md w-full bg-yellow-500 text-slate-100 hover:bg-yellow-600"> {loading ? 'Loading...' : "Login"} </button>
      </div>
    </div>
  );
}

export default Login;
