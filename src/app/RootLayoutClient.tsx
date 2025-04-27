'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    const isEmployeeDashboard = pathname?.startsWith('/employee-dashboard');

    return (
        <>
            {!isDashboard && !isEmployeeDashboard && <Navbar />}
            {children}
        </>
    );
} 