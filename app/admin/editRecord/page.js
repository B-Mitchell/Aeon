'use client';
import React, { useEffect, useState } from 'react';
import supabase from '@/app/supabase'; // Adjust the import path as needed
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    size: '',
    owner: '',
    ownershipType: '',
    zoning: '',
    registeredDate: '',
    marketValue: ''
  });
  const user_id = useSelector(state => state.user.id);
  const role = useSelector(state => state.user.role);

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/profile');
      return;
    }

    const fetchRecords = async () => {
      try {
        const { data, error } = await supabase
          .from('LAND RECORDS') // Replace with your actual table name
          .select('*');

        if (error) {
          console.error('Error fetching records:', error);
        } else {
          setRecords(data);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchRecords();
  }, [user_id, role, router]);

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setFormData({
      name: record.name,
      location: record.location,
      size: record.size,
      owner: record.owner,
      ownershipType: record.ownershipType,
      zoning: record.zoning,
      registeredDate: record.registeredDate,
      marketValue: record.marketValue
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this record?')) {
      try {
        const { error } = await supabase
          .from('LAND RECORDS')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting record:', error);
        } else {
          setRecords(records.filter(record => record.id !== id));
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRecord) {
      try {
        const { error } = await supabase
          .from('LAND RECORDS')
          .update(formData)
          .eq('id', selectedRecord.id);

        if (error) {
          console.error('Error updating record:', error);
        } else {
          setRecords(records.map(record =>
            record.id === selectedRecord.id
              ? { ...record, ...formData }
              : record
          ));
          setSelectedRecord(null);
          setFormData({
            name: '',
            location: '',
            size: '',
            owner: '',
            ownershipType: '',
            zoning: '',
            registeredDate: '',
            marketValue: ''
          });
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-6">Admin - Edit and Delete Records</h1>

      <div className="mb-6">
        {selectedRecord && (
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Record</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Size</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Owner</label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Ownership Type</label>
              <select
                name="ownershipType"
                value={formData.ownershipType}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required>
                <option value="">Select ownership type</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
                <option value="private">private</option>
                <option value="communal">communal</option>
                <option value="government lease">government lease</option>
            </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Zoning</label>
              <input
                type="text"
                name="zoning"
                value={formData.zoning}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Registered Date</label>
              <input
                type="text"
                name="registeredDate"
                value={formData.registeredDate}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Market Value</label>
              <input
                type="text"
                name="marketValue"
                value={formData.marketValue}
                onChange={handleFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Update Record
            </button>
          </form>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Records List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Owner</th>
              <th className="border px-4 py-2">Ownership Type</th>
              <th className="border px-4 py-2">Zoning</th>
              <th className="border px-4 py-2">Registered Date</th>
              <th className="border px-4 py-2">Market Value</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td className="border px-4 py-2">{record.name}</td>
                <td className="border px-4 py-2">{record.location}</td>
                <td className="border px-4 py-2">{record.size}</td>
                <td className="border px-4 py-2">{record.owner}</td>
                <td className="border px-4 py-2">{record.ownershipType}</td>
                <td className="border px-4 py-2">{record.zoning}</td>
                <td className="border px-4 py-2">{record.registeredDate}</td>
                <td className="border px-4 py-2">{record.marketValue}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(record)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition duration-200 m-auto block"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-200 m-auto block mt-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
