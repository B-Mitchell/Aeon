'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import supabase from '@/app/supabase'; // Adjust the import path as needed

const Page = () => {
  const router = useRouter();
  const user_id = useSelector(state => state.user.user_id);
  const role = useSelector(state => state.user.role);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
  });

  // Check if user is logged in
  useEffect(() => {
    if (user_id) {
      if (role === 'admin') {
        console.log(role);
      } else {
        router.push('/profile'); // Redirect to User Profile
      }
    } else {
      router.push('/auth/login');
    }
  }, [user_id, role, router]);

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        let { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*');

        if (usersError) console.error('Error fetching users:', usersError);
        else setUsers(usersData);

        // Fetch records
        let { data: recordsData, error: recordsError } = await supabase
          .from('LAND RECORDS') // Replace with your actual table name
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (recordsError) console.error('Error fetching records:', recordsError);
        else setRecords(recordsData);

        // Fetch stats (example logic)
        setStats({
          totalUsers: usersData.length,
          activeUsers: usersData.filter(user => user.status === 'active').length,
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen min-w-[50rem]">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Statistics Section */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl">{stats.totalUsers}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-2xl">{stats.activeUsers}</p>
          </div>
          {/* Additional stats can be added here */}
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">User ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2">
                  {/* Add Edit/Delete buttons or other actions */}
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Records Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Recent Records</h2>
        <ul className="list-disc pl-5">
          {records.map((record) => (
            <li key={record.id} className="mb-2">
              <a href={`/land_records/${record.id}`} className="text-blue-600 hover:underline">
                {record.name || 'Untitled Document'}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p>No new notifications at this moment.</p>
      </div>
    </div>
  );
};

export default Page;
