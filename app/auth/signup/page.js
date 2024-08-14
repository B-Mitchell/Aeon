'use client'
import React, { useState } from 'react';
import supabase from '../../supabase.js';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  // sign in data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agency, setAgency] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      email: email,
      password: password,
      options: {
        data: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        agency: agency,
        role: role,
        }
    }
    }
    try {
      let { data, error } = await supabase.auth.signUp(formData);
      if (error) {
        console.log('supabase error: ' + error);
      } else {
        addToUsersTable();
        router.push('/auth/login');
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const addToUsersTable = async () => {
    const datas = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      agency: agency,
      role: role
    }
    try {
    const { data, error } = await supabase.from('users').insert([datas]).select()

    if (error) {
      console.log(error)
    } else {
      console.log("success!")
    }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='text-[#666666]'>
      <form onSubmit={handleSubmit} className='bg-white text-gray-780 w-[95%] md:w-[60%] lg:w-[] m-auto p-4 border-[.1rem] rounded-lg my-auto block mt-[5%] md:mt-[10%] lg:mt-[5%] shadow-lg'>
      <p className='font-semibold text-center text-[1.4rem] mt-5 text-black mb-5'>Create an account</p>
        <p className='w-[95%] m-auto text-black'>Email</p>
        <input name="user_email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="eg: johnDoe@gmail.com" required className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'/>

        <p className='w-[95%] m-auto text-black'>Agency</p>
        <input name="user_email" value={agency} onChange={(e) => setAgency(e.target.value)} placeholder="eg: Aeon Housing and land services" required className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'/>

        <p className='w-[95%] m-auto text-black'>First name</p>
        <input name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="eg: John" required 
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'/>

        <p className='w-[95%] m-auto text-black'>Last name</p>
        <input name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="eg: Doe" required 
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'/>

        <p className='w-[95%] m-auto text-black'>Phone number</p>
        <input name="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="eg: 070********79" required 
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none focus:scale-105 focus:rounded-none transition'/>

        <p className='w-[95%] m-auto text-black'>Password</p>
        <input name="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="eg: *******" required 
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-7 focus:scale-105 focus:rounded-none transition'/>

        <button type="submit"
        className='block my-2 w-[95%] m-auto rounded-lg p-2 border-2 bg-green-600 text-white hover:bg-green-700 hover:rounded-none mt-3'>{isLoading ? 'Signing in...' : 'Sign in'}</button>

        <p className='text-center mt-5 '>already have an account ? <span className='text-green-700 cursor-pointer' onClick={() => router.push('/auth/login')}>Login</span></p>
      </form>
    </div>
  );
};

export default SignIn;
