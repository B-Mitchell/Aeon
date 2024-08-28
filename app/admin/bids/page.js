'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/app/supabase';
import 'maplibre-gl/dist/maplibre-gl.css'; // Ensure this is imported if needed for styling consistency

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all bids from the database
  const fetchBids = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bids')
        .select('id, bid_amount, user_id, status, land_id') // Fetch necessary fields
        .order('created_at', { ascending: false }); // Order by latest bids

      if (error) throw error;
      setBids(data);
    } catch (error) {
      console.error('Error fetching bids:', error.message);
      setMessage('Failed to fetch bids. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Approve bid function
  const handleApproveBid = async (bidId) => {
    try {
      const { error } = await supabase
        .from('bids')
        .update({ status: 'approved' })
        .eq('id', bidId);

      if (error) throw error;

      setMessage('Bid approved successfully.');
      fetchBids(); // Refresh bids after approval
    } catch (error) {
      console.error('Error approving bid:', error.message);
      setMessage('Failed to approve bid. Please try again.');
    }
  };

  // Reject bid function
  const handleRejectBid = async (bidId) => {
    try {
      const { error } = await supabase
        .from('bids')
        .update({ status: 'rejected' })
        .eq('id', bidId);

      if (error) throw error;

      setMessage('Bid rejected successfully.');
      fetchBids(); // Refresh bids after rejection
    } catch (error) {
      console.error('Error rejecting bid:', error.message);
      setMessage('Failed to reject bid. Please try again.');
    }
  };

  // Delete bid function
  const handleDeleteBid = async (bidId) => {
    try {
      const { error } = await supabase
        .from('bids')
        .delete()
        .eq('id', bidId);

      if (error) throw error;

      setMessage('Bid deleted successfully.');
      fetchBids(); // Refresh bids after deletion
    } catch (error) {
      console.error('Error deleting bid:', error.message);
      setMessage('Failed to delete bid. Please try again.');
    }
  };

  useEffect(() => {
    fetchBids(); // Fetch bids when the component mounts
  }, []);

  return (
    <div className="container mx-auto p-6 md:scale-95 xl:scale-100">
      <h1 className="text-center text-[2rem] font-bold">Admin - Manage Bids</h1>
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      {loading ? (
        <p className="text-center mt-10 animate-pulse">Loading bids...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 min-w-[50rem]">
          {bids.length === 0 ? (
            <p className="text-center">No Bids available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 scale-95">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bid Amount (NGN)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-center">
                    view more
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{bid.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{bid.bid_amount}</td>
                    <td className="py-4 text-[.7rem] overflow-hidden whitespace-nowrap text-ellipsis">{bid.user_id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${bid.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}  ${bid.status === 'rejected' ? 'text-red-500' : null}`}>{bid.status || 'pending'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleApproveBid(bid.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectBid(bid.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDeleteBid(bid.id)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-400 underline"><p ><a href={`/land_records/${bid.land_id}`}>more info</a></p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
