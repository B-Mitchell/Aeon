'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '@/app/supabase';
import { setFirstName, setLastName, setPhoneNumber, setUserId, setEmail, setAgency } from '../../globalRedux/slices/userSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user.user_id);
  // form states
  const [email, setLoginEmail] = useState('');
  const [password, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // handle loading state

  // check if user is logged in
  useEffect(() => {
    console.log(user_id)
    if (user_id) {
      router.push('/profile');
    }
  }, [user_id, router]);

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = {
      email: email,
      password: password,
    }
    try {
      let { data, error } = await supabase.auth.signInWithPassword(formData);
      if (error) {
        console.log('supabase error: ' + error);
      } else {
        console.log(data);
        // Save logged in user to state
        const user = data.user;
        const userMetadata = user.user_metadata;
        console.log(userMetadata);
        dispatch(setUserId(user.id));
        dispatch(setEmail(userMetadata.email));
        dispatch(setFirstName(userMetadata.first_name));
        dispatch(setLastName(userMetadata.last_name));
        dispatch(setPhoneNumber(userMetadata.phone_number));
        dispatch(setAgency(userMetadata.agency))
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <form onSubmit={handleSubmit} className='bg-white text-gray-780 w-[95%] md:w-[60%] lg:w-[] m-auto p-4 border-[.1rem] rounded-lg my-auto block mt-[20%] md:mt-[10%] lg:mt-[5%] shadow-lg'> 
    <p className='font-semibold text-center text-[1.4rem] mt-5 text-black mb-5'>Login to your account</p>
    <p className='w-[95%] m-auto text-black'>Email</p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setLoginEmail(e.target.value)}
        placeholder="eg: johnDoe@gmail.com"
        required
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'
      />
      <p className='w-[95%] m-auto text-black'>Password</p>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setLoginPassword(e.target.value)}
        placeholder="eg: *********"
        required
        className='block my-2 w-[95%] m-auto rounded-lg p-3 border-2 border-[#666666] outline-none mb-3 focus:scale-105 focus:rounded-none transition'
      />
      <button type="submit" className='block my-2 w-[95%] m-auto rounded-lg p-2 border-2 bg-green-600 text-white hover:bg-green-700 hover:rounded-none mt-3'>{isLoading ? 'Logging in...' : 'Log in'}</button>
      <p className='text-center mt-5 '>already have an account ? <span className='text-green-700 cursor-pointer' onClick={() => router.push('/auth/signup')}>Sign up</span></p>
    </form>
  );
};

export default Login;