'use client'
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Page = () => {
  const router = useRouter();
    const user_id = useSelector(state => state.user.user_id);
    const agency = useSelector(state => state.user.agency);
    const email = useSelector(state => state.user.user_email);
    const firstName = useSelector(state => state.user.first_name);
    const lastName = useSelector(state => state.user.last_name);
    const phoneNumber = useSelector(state => state.user.phone_number);
    const role = useSelector(state => state.user.role);
    // check if user is logged out
    useEffect(() => {
      console.log(user_id)
      if (!user_id) {
        router.push('/auth/login');
      }
    }, [user_id, router]);
    return (
      <>
        <div className="w-[90%] md:w-[80%] shadow-lg bg-white m-auto mt-10 rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Profile</h1>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-700">Agency:</span>
                    <span className="text-lg text-gray-600">{agency}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-700">Email:</span>
                    <span className="text-lg text-gray-600">{email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-700">First Name:</span>
                    <span className="text-base text-gray-600">{firstName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-700">Last Name:</span>
                    <span className="text-base text-gray-600">{lastName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-700">Phone Number:</span>
                    <span className="text-base text-gray-600">{phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-700">role:</span>
                    <span className="text-base text-gray-600">{role}</span>
                </div>
            </div>
        </div>
        <div className="w-[90%] md:w-[80%] shadow-lg bg-white m-auto mt-6 rounded-lg p-4 flex justify-between">
            {role === 'admin' ? <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 w-[30%] " onClick={() => router.push('/admin/addRecord')}>Add New Record</button> : null}
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 w-[30%] " onClick={() => router.push('/land_records')}>View Available Records</button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 w-[30%] " onClick={() => router.push(`/profile/${user_id}`)}>View Bids</button>
        </div>
      </>
    )
}

export default Page;
