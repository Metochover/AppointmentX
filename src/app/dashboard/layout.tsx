'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            router.push('/login');
            return;
        }
    }, [router]);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="lg:ml-64">
                <div className="dashboard-content">
                    {children}
                </div>
            </main>
        </div>
    );
} 