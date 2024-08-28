'use client'
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '@/app/supabase'; // Adjust the import path as needed
import HeroImage from '../../public/Homepage/Hero.jpg';

export default function Homepage() {
  const router = useRouter();
  const role = useSelector(state => state.user.role);
  const [recentRecords, setRecentRecords] = useState([]);

  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        let { data, error } = await supabase
          .from('LAND RECORDS') // Replace with your actual table name
          .select('*')
          .order('created_at', { ascending: false }) // Replace 'created_at' with the actual timestamp field if different
          .limit(3);

        if (error) {
          console.error('Error fetching recent records:', error);
        } else {
          setRecentRecords(data);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchRecentRecords();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Land Information Management System</title>
        <meta name="description" content="A computerized land information management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh]">
  <Image 
    src={HeroImage} 
    alt="Hero Image" 
    layout="fill" 
    objectFit="cover" 
    quality={100}
    className="absolute inset-0"
  />
  <div className="relative container mx-auto text-center px-6 flex flex-col items-center justify-center h-full z-10">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Aeon System</h1>
    <p className="text-lg md:text-xl text-white mb-8">Manage and view land information with ease and efficiency.</p>
    <div className="flex justify-center gap-4">
      {
        role === 'admin' ? (
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200" onClick={() => router.push('/admin/addRecord')}>
            Add New Record
          </button>
        ) : null
      }
      <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200" onClick={() => router.push('/land_records')}>
        View Available Records
      </button>
    </div>
    {
      role === 'admin' ? (
        <button className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-black transition duration-200 mt-8" onClick={() => router.push('/admin/dashboard')}>
          View Dashboard
        </button>
      ) : null
    }
  </div>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>
</section>


        {/* About Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-semibold mb-8">About Us</h2>
            <p className="text-lg leading-relaxed">
              LandInfo is a comprehensive land information management system designed to streamline the process of managing land records, generating reports, and visualizing data through interactive maps.
            </p>
          </div>
        </section>

        {/* Features Section with SVG Icons */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-semibold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <div className="flex justify-center mb-4">
                  {/* Use an SVG icon here */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 12a3 3 0 100 6 3 3 0 000-6zm0 0a3 3 0 110-6 3 3 0 010 6zm6 0h2a2 2 0 012 2v2m0 0a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2h2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Search Land Records</h3>
                <p>Quickly search and access land records with an efficient search functionality.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <div className="flex justify-center mb-4">
                  {/* Use an SVG icon here */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Interactive Maps</h3>
                <p>Visualize land data with interactive and user-friendly maps.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <div className="flex justify-center mb-4">
                  {/* Use an SVG icon here */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-4 4m0 0l-4-4m4 4V7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Detailed Reports</h3>
                <p>Create and download comprehensive reports on land data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Documents Section */}
        <section id="documents" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Documents and Records</h2>
            <ul className="list-disc pl-5 bg-white p-4 rounded shadow">
              {recentRecords.length > 0 ? (
                recentRecords.map((record) => (
                  <li key={record.id}>
                    <a href={`/land_records/${record.id}`} className="text-blue-600 hover:underline">
                      {record.name || 'Untitled Document'}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No recent records found.</li>
              )}
            </ul>
          </div>
        </section>

        {/* Help and Support Section */}
        <section id="support" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-4">Help and Support</h2>
            <div className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Help Center</h3>
                <p><a href="#" className="text-blue-600 hover:underline">Visit our Help Center for FAQs and guides.</a></p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Contact Support</h3>
                <p><a href="mailto:support@landmanagement.com" className="text-blue-600 hover:underline">Email us at support@landmanagement.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
