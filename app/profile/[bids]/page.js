'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/app/supabase'; // Adjust the import path as needed
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const route = params.bids;
    const router = useRouter();
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBids = async () => {
        setLoading(true);
        try {
            // Corrected the Supabase query to select specific fields
            let { data, error } = await supabase
                .from('bids')
                .select('id, user_id, land_id, bid_amount, status') // Add the fields you need
                .eq('user_id', route); // Assuming 'route' contains the user_id

            if (error) throw error;
            setBids(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBids();
    }, [route]); // Dependency array includes 'route'
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Bids</h1>
            {loading ? (
                <p className="text-lg text-gray-500">Loading...</p>
            ) : bids.length > 0 ? (
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-4 md:px-6 text-left">User ID</th>
                                <th className="py-3 px-4 md:px-6 text-left">Land ID</th>
                                <th className="py-3 px-4 md:px-6 text-left">Bid Amount</th>
                                <th className="py-3 px-4 md:px-6 text-left">Status</th>
                                <th className="py-3 px-4 md:px-6 text-left">view more</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {bids.map((bid, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-4 md:px-6 text-left">{bid.user_id}</td>
                                    <td className="py-3 px-4 md:px-6 text-left">{bid.land_id}</td>
                                    <td className="py-3 px-4 md:px-6 text-left">{bid.bid_amount}</td>
                                    <td className={`py-3 px-4 md:px-6 text-left ${bid.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}  ${bid.status === 'rejected' ? 'text-red-500' : null}`}>{bid.status}</td>
                                    <td className={`cursor-pointer py-3 px-4 md:px-6 text-left text-blue-400 underline`} onClick={() => router.push(`/land_records/${bid.land_id}`)}>view more</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-lg text-gray-500">No bids available</p>
            )}
        </div>
    );
};

export default Page;
