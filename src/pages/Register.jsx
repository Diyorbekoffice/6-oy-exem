import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axi from '../../axios';
import { ScaleLoader } from 'react-spinners';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const FirstnameRef = useRef();
  const LastnameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const FormRef = useRef();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    const isValid = /^(?=.*[a-zA-Z]).{4,}$/;
    return isValid.test(password);
  };

  function validate() {
    if (FirstnameRef.current.value.length < 3) {
      alert('Ism kamida 3 ta belgidan iborat bo\'lishi kerak.');
      FirstnameRef.current.focus();
      return false;
    }

    if (!validateEmail(emailRef.current.value)) {
      alert('Email notugri.');
      emailRef.current.focus();
      return false;
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert("Parol kamida 4 ta belgidan iborat bo'lishi va unda kamida bitta harf bo'lishi kerak.");
      passwordRef.current.focus();
      return false;
    }

    if (passwordRef.current.value !== rePasswordRef.current.value) {
      alert("Parollar mos kelmaydi.");
      rePasswordRef.current.focus();
      return false;
    }

    return true;
  }

  function handleClick(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    const user = {
      "email": emailRef.current.value,
      "firstName": FirstnameRef.current.value,
      "lastName": LastnameRef.current.value,
      "age": ageRef.current.value,
      "password": passwordRef.current.value,
      "confirmPassword": rePasswordRef.current.value
    };

    axi.post('/register', user)
      .then((response) => {
        const data = response.data;
        if (data.message) {
          alert('Muvaffaqiyatli ruyxatdan utildi!');
          navigate('/login');
          FormRef.current.reset();
        }
      })
      .catch((error) => {
        console.log('Xatolik:', error);
        alert('Ruyxatdan utishda xatolik yuz berdi.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex justify-center mt-20">
      <form ref={FormRef} className="flex flex-col w-[400px] bg-green-500 p-5 gap-7 rounded-lg">
        <div className='text-center'>
          {loading && <ScaleLoader color='green' size={300} />}
        </div>
        <h3 className="text-center font-bold text-yellow-100">Register</h3>
        <input ref={FirstnameRef} className="p-3 rounded-md w-full" type="text" placeholder="Enter firsname..." />
        <input ref={LastnameRef} className="p-3 rounded-md w-full" type="text" placeholder="Enter lastname..." />
        <input ref={ageRef} className="p-3 rounded-md w-full" type="number" placeholder="Enter age..." />
        <input ref={emailRef} className="p-3 rounded-md w-full" type="email" placeholder="Enter email..." />
        <input ref={passwordRef} className="p-3 rounded-md w-full" type="password" placeholder="Enter password..." />
        <input ref={rePasswordRef} className="p-3 rounded-md w-full" type="password" placeholder="Enter repeat password..." />
        <Link className='text-blue-700 underline ' to='/login'>Do you have an account?</Link>
        <button onClick={handleClick} disabled={loading} className={`p-3 rounded-md w-full ${loading ? 'bg-gray-400' : 'bg-yellow-500'} text-slate-100 hover:bg-yellow-600`} > {loading ? 'Iltimos kuting...' : "Ro'yxatdan o'tish"} </button>
      </form>
    </div>
  );
}

export default Register;
