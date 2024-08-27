'use client'
import React, {useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 border-t-2 min-w-[15rem]">
        <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>
        <hr /><br />
        <nav>
          <ul>
            <li className="mb-2" onClick={() => router.push('/admin/dashboard')}>
              <Link href="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded block">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/addRecord" className="hover:bg-gray-700 p-2 rounded block">Add Record</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/bids" className="hover:bg-gray-700 p-2 rounded block">Bids</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/users" className="hover:bg-gray-700 p-2 rounded block">Manage Users</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-5 overflow-auto">
        <header className="mb-5">
          <h1 className="text-xl font-bold">Welcome, Admin</h1>
        </header>
        <section>
          {children}
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
