'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function EmployeeDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-purple-700 text-white flex flex-col py-6 px-4 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Çalışan Paneli</h1>
                </div>
                <nav className="flex-1 space-y-2">
                    <Link href="/employee-dashboard" className="flex items-center px-3 py-2 rounded hover:bg-purple-600">
                        <FaCalendarAlt className="mr-3" /> Randevularım
                    </Link>
                    <Link href="/employee-dashboard/expenses" className="flex items-center px-3 py-2 rounded hover:bg-purple-600">
                        <FaClipboardList className="mr-3" /> Masraflar
                    </Link>
                </nav>
                <button
                    onClick={handleLogout}
                    className="mt-8 flex items-center px-3 py-2 rounded bg-purple-600 hover:bg-purple-800 text-white"
                >
                    <FaSignOutAlt className="mr-2" /> Çıkış Yap
                </button>
            </aside>
            {/* Main content */}
            <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
} 