'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserId, setEmail, setFirstName, setLastName, setPhoneNumber } from '../../globalRedux/slices/userSlice';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    user_id: '',
    user_email: '',
    first_name: '',
    last_name: '',
    organizer_name: '',
    phone_number: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUserId(form.user_id));
    dispatch(setEmail(form.user_email));
    dispatch(setFirstName(form.first_name));
    dispatch(setLastName(form.last_name));
    dispatch(setPhoneNumber(form.phone_number));
    // You can add further actions such as API calls here
  };

  return (
    <div className='text-[#666666]'>
      <form onSubmit={handleSubmit} className='bg-white text-gray-780 w-[95%] md:w-[60%] lg:w-[] m-auto p-4 border-[.1rem] border-[#666666] rounded-lg my-auto block mt-[5%] md:mt-[10%] lg:mt-[5%]'>
      <p className='font-semibold text-center text-[1.4rem] mt-5 text-black mb-5'>Create an account</p>
        <p className='w-[95%] m-auto'>Email</p>
        <input name="user_email" value={form.user_email} onChange={handleChange} placeholder="enter email" required className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'/>
        <p className='w-[95%] m-auto'>First name</p>
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required 
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'/>
        <p className='w-[95%] m-auto'>Last name</p>
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required 
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'/>
        <p className='w-[95%] m-auto'>Phone number</p>
        <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" required 
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-7 focus:scale-105 focus:rounded-none transition'/>
        <button type="submit" 
        className='block my-2 w-[95%] m-auto rounded-lg p-2 border-2 border-[#666666] bg-[#666666] text-white hover:bg-green-700 hover:rounded-none mt-3'>Sign In</button>

        <p className='text-center mt-5 '>already have an account ? <span className='text-green-700 cursor-pointer' onClick={() => router.push('/auth/login')}>Login</span></p>
      </form>
    </div>
  );
};

export default SignIn;
