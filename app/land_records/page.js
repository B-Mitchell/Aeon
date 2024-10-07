'use client';
import supabase from '../supabase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter();
    const role = useSelector(state => state.user.role);
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState('name');

    const filteredLands = fetchedData
        .filter((land) =>
            land.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            land.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            land.longitude.toString().includes(searchQuery) || // Include longitude in search
            land.latitude.toString().includes(searchQuery)    // Include latitude in search
        )
        .sort((a, b) => {
            if (sortKey === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortKey === 'location') {
                return a.location.localeCompare(b.location);
            } else if (sortKey === 'size') {
                return parseInt(a.size) - parseInt(b.size);
            } else if (sortKey === 'marketValue') {
                return parseFloat(a.marketValue.replace(/[$,]/g, '')) - parseFloat(b.marketValue.replace(/[$,]/g, ''));
            }
            return 0;
        });

    // Function to retrieve data from the database
    const fetchLandRecords = async () => {
        setLoading(true);
        try {
            let { data, error } = await supabase
                .from('LAND RECORDS')
                .select('*'); // Ensure longitude and latitude are included in the table

            if (error) {
                console.log('error fetching records');
            } else {
                setFetchedData(data);
                // console.log('fetched data:' + data);
            }
        } catch (error) {
            console.error(error);
            alert('error fetching records');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLandRecords();
    }, [])

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Lands</h1>
            {
                role !== 'admin' ? null :
                    <button onClick={() => router.push('/admin/addRecord')} className='fixed right-3 bottom-[1rem] bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-950'>Add New Record</button>
            }
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row justify-between mb-6">
                <input
                    type="text"
                    placeholder="Search by name, location, longitude, or latitude..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full md:w-[50%] mb-4 md:mb-0 outline-none"
                />
                <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full md:w-1/4 outline-none"
                >
                    <option value="name">Sort by Name</option>
                    <option value="location">Sort by Location</option>
                    <option value="size">Sort by Size</option>
                    <option value="marketValue">Sort by Market Value</option>
                </select>
            </div>

            {/* Land Records */}
            {
                loading ?
                    <p className='text-center mt-10 animate-pulse'>Loading records...</p> :
                    <div className="space-y-4">
                        {filteredLands.map((land) => (
                            <div key={land.id} className="flex flex-wrap md:flex-nowrap bg-white shadow-md rounded-lg p-6 items-center">
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold mb-2">{land.name}</h2>
                                    <p><span className="font-semibold">Location:</span> {land.location}</p>
                                    <p><span className="font-semibold">Size:</span> {land.size}</p>
                                    <p><span className="font-semibold">Owner:</span> {land.owner}</p>
                                    <p><span className="font-semibold">Market Value:</span> {land.marketValue}</p>
                                    <p><span className="font-semibold">Longitude:</span> {land.longitude}</p>
                                    <p><span className="font-semibold">Latitude:</span> {land.latitude}</p>
                                </div>
                                <button className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 md:ml-6" onClick={() => router.push(`/land_records/${land.id}`)}>
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default Page;
