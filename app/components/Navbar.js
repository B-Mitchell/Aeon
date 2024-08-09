'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../globalRedux/slices/userSlice';

const Navbar = () => {
    const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <p className='text-[2rem]'>Aeon</p>
        </div>
        <ul className="flex space-x-4">
          <li>
            <p onClick={() => router.push('/')} className="text-white hover:text-gray-300 cursor-pointer">Home</p>
          </li>
          {user.user_id ? (
            <>
              <li className="text-white">Welcome, {user.first_name}</li>
              <li>
                <button
                  className="text-white hover:text-gray-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <p onClick={() => router.push('/auth/signup')} className="text-white hover:text-gray-300 cursor-pointer">Sign In</p>
              </li>
              <li>
                <p onClick={() => router.push('/auth/login')} className="text-white hover:text-gray-300 cursor-pointer">Login</p>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
