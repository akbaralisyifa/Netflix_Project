import React, { useState } from 'react';
import bgImage from '../assets/bg-login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function SignUp() {
  const [emal, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(emal, password);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <img className="hidden sm:block w-full h-full object-cover" src={bgImage} alt="" />
      <div className=" bg-black/50 top-0 left-0 w-full h-screen absolute"></div>
      <div className=" absolute top-0 left-0 w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign Up</h1>

            <form className="w-full flex flex-col py-4">
              <input onChange={(e) => setEmail(e.target.value)} className="p-3 my-2 bg-gray-700 rounded" type="email" placeholder="Email" autoComplete="email" />
              <input onChange={(e) => setPassword(e.target.value)} className="p-3 my-2 bg-gray-700 rounded" type="password" placeholder="Password" autoComplete="current-password" />
              <button onClick={handleSubmit} className="bg-red-600 py-3 my-6 rounded font-bold ">
                Sign Up
              </button>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>
                  <input className="mr-2" type="checkbox" /> Remember Me
                </p>
                <p>Need help?</p>
              </div>

              <p className="py-8 text-center">
                <span className="text-gray-600">Already subscribed to Netflix?</span>
                <Link to={'/login'}> Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
