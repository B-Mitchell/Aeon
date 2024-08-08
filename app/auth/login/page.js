'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail, setFirstName, setLastName, setPhoneNumber, setUserId } from '../../globalRedux/slices/userSlice';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
  const [credentials, setCredentials] = useState({ user_email: '', user_id: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserId(credentials.user_id));
    dispatch(setEmail(credentials.user_email));
    // You might want to validate and fetch the rest of the user details from an API
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white text-gray-780 w-[95%] md:w-[60%] lg:w-[] m-auto p-4 border-[.1rem] border-[#666666] rounded-lg my-auto block mt-[20%] md:mt-[10%] lg:mt-[5%]'> 
    <p className='font-semibold text-center text-[1.4rem] mt-5 text-black mb-5'>Login to your account</p>
    <p className='w-[95%] m-auto'>Email</p>
      <input
        type="text"
        name="user_id"
        value={credentials.user_email}
        onChange={handleChange}
        placeholder="input your email"
        required
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'
      />
      <p className='w-[95%] m-auto'>Password</p>
      <input
        type="email"
        name="user_email"
        value={credentials.password}
        onChange={handleChange}
        placeholder="input your password"
        required
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'
      />
      <button type="submit" className='block my-2 w-[95%] m-auto rounded-lg p-2 border-2 border-[#666666] bg-[#666666] text-white hover:bg-green-700 hover:rounded-none mt-3'>Login</button>
      <p className='text-center mt-5 '>already have an account ? <span className='text-green-700 cursor-pointer' onClick={() => router.push('/auth/signup')}>Sign up</span></p>
    </form>
  );
};

export default Login;