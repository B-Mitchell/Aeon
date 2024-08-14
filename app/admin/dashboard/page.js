'use client'
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Page = () => {
    const router = useRouter();
    const user_id = useSelector(state => state.user.user_id);
    const role = useSelector(state => state.user.role);

  // check if user is logged in
  useEffect(() => {
    if (user_id) {
      if (role === 'admin') {
        console.log(role)
      } else {
        router.push('/profile'); // User Profile
      }
    } else {
        router.push('/auth/login')
    }
  }, [user_id, role, router]);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <p>Here is an overview of the admin dashboard.</p>
        {/* Add your dashboard content here */}
      </div>
    </>
  );
};

export default Page;
