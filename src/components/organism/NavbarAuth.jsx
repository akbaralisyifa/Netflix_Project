import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarAuth(props) {
  const { handleLogout, text, button, toSignup, to } = props;
  return (
    <>
      <div>
        <Link to={to}>
          <button className="text-white pr-4 ">{text}</button>
        </Link>
        <Link to={toSignup}>
          <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded cursor-pointer  text-white">
            {button}
          </button>
        </Link>
      </div>
    </>
  );
}
