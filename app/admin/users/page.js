'use client'
import React, { useEffect, useState } from 'react';
import supabase from '@/app/supabase';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Page = () => {
  const router = useRouter();
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('firstName');
  const [loading, setLoading] = useState(false);
  const user_id = useSelector(state => state.user.user_id);
  const role = useSelector(state => state.user.role);

  useEffect(() => {
    if (user_id) {
      if (role !== 'admin') {
        router.push('/profile');
      }
    } else {
      router.push('/auth/login');
    }
  }, [user_id, role, router]);

  // Function to fetch all users
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      let { data: users, error } = await supabase
        .from('users')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setFetchedUsers(users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Filter and sort users
  const filteredUsers = fetchedUsers
    .filter(user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'firstName') {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortBy === 'lastName') {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      } else if (sortBy === 'role') {
        return a.role.localeCompare(b.role);
      }
      return 0;
    });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>
      
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded border-2 border-gray-300 w-[60%] focus:outline-none"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded border-2 border-gray-300"
        >
          <option value="firstName">Sort by First Name</option>
          <option value="lastName">Sort by Last Name</option>
          <option value="email">Sort by Email</option>
          <option value="role">Sort by Role</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center mt-10 animate-pulse">Loading users, please wait...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white p-5 shadow rounded-lg min-w-[20rem] overflow-hidden">
              <p className="font-semibold text-lg text-gray-700 mb-2">{user.firstName} {user.lastName}</p>
              <p className="text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-600 mb-1"><strong>Phone:</strong> {user.phoneNumber}</p>
              <p className="text-gray-600 mb-1"><strong>Role:</strong> {user.role}</p>
              <p className="text-gray-600"><strong>Agency:</strong> {user.agency}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
