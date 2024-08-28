'use client'
import supabase from '@/app/supabase';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CreateLandRecord = () => {
    const router = useRouter();
    const user_id = useSelector(state => state.user.user_id);
    const role = useSelector(state => state.user.role);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: user_id,
        name: '',
        location: '',
        size: '',
        owner: '',
        ownershipType: '',
        zoning: '',
        registeredDate: '',
        marketValue: '',
    });
    // check if user is logged out
    useEffect(() => {
      if (user_id) {
        if (role !== 'admin') {
          router.push('/profile');
        }
      } else {
        router.push('/auth/login');
      }
    }, [user_id, role, router]);
    

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log('Form data submitted:', formData);
        try {
            const { data, error } = await supabase
            .from('LAND RECORDS')
            .insert([formData])
            .select()

            if (error) {
                console.error('Error uploading record:', error.message);
            } else {
                console.log('product uploaded successfully:', data);
                alert('record added successfully!');
                setFormData({
                    userId: user_id,
                    name: '',
                    location: '',
                    size: '',
                    owner: '',
                    ownershipType: '',
                    zoning: '',
                    registeredDate: '',
                    marketValue: '',
                });
            }
        
        } catch(error) {
            console.error(error);
            alert('error in submission!')
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="container mx-auto p-6 w-[100%] md:w-[70%] lg:w-[70%] min-w-[30rem]">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Land Record</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Land Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter land name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location/ Address
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
            Size (e.g., 500 acres)
          </label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Enter size"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="owner">
            Owner
          </label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            placeholder="Enter owner name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownershipType">
            Ownership Type
          </label>
          <select
            name="ownershipType"
            value={formData.ownershipType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select ownership type</option>
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
            <option value="private">private</option>
            <option value="communal">communal</option>
            <option value="government lease">government lease</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zoning">
            Zoning
          </label>
          <input
            type="text"
            name="zoning"
            value={formData.zoning}
            onChange={handleChange}
            placeholder="Enter zoning type (e.g., Residential)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registeredDate">
            Registered Date
          </label>
          <input
            type="date"
            name="registeredDate"
            value={formData.registeredDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marketValue">
            Market Value (e.g., 5,000,000)
          </label>
          <input
            type="number"
            name="marketValue"
            value={formData.marketValue}
            onChange={handleChange}
            placeholder="Enter market value"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            {loading ? 'creating record...' : 'Create Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLandRecord;
