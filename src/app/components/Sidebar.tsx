'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaCalendarAlt, FaUsers, FaCut, FaUserTie, FaCog, FaClipboardList, FaFileMedical, FaIdCard, FaPaw, FaBook, FaDumbbell } from 'react-icons/fa';
import type { Route } from 'next';

const navigation: { name: string; href: string; icon: any }[] = [
    { name: 'Anasayfa', href: '/dashboard', icon: FaHome },
    { name: 'Randevular', href: '/dashboard/appointments', icon: FaCalendarAlt },
    { name: 'Müşteriler', href: '/dashboard/customers', icon: FaUsers },
    { name: 'Hizmetler', href: '/dashboard/services', icon: FaCut },
    { name: 'Çalışanlar', href: '/dashboard/employees', icon: FaUserTie },
    { name: 'Ayarlar', href: '/dashboard/settings', icon: FaCog },
];

const categoryMenus: Record<string, { name: string; href: string; icon: any }[]> = {
    'Kuaför & Güzellik': [
        { name: 'Masraf', href: '/dashboard/expenses', icon: FaClipboardList }
    ],
    'Diş & Sağlık': [
        { name: 'Tedavi Raporları', href: '/dashboard/treatments', icon: FaFileMedical }
    ],
    'Spor & Fitness': [
        { name: 'Üyelikler', href: '/dashboard/memberships', icon: FaIdCard }
    ],
    'Veteriner': [
        { name: 'Evcil Hayvanlarım', href: '/dashboard/pets', icon: FaPaw }
    ],
    'Psikolog': [
        { name: 'Seans Notları', href: '/dashboard/sessions', icon: FaBook }
    ],
    'Fizyoterapist': [
        { name: 'Egzersiz Planları', href: '/dashboard/exercises', icon: FaDumbbell }
    ],
};

export default function Sidebar() {
    const pathname = usePathname();
    const [businessCategory, setBusinessCategory] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('currentUser');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    setBusinessCategory(user.businessCategory || null);
                } catch { }
            }
        }
    }, []);

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-purple-600">
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center h-16 flex-shrink-0 px-4 bg-purple-700">
                    <h1 className="text-xl font-bold text-white">Randevu Sistemi</h1>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href as Route}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                                        ? 'bg-purple-700 text-white'
                                        : 'text-purple-100 hover:bg-purple-700'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive ? 'text-white' : 'text-purple-300 group-hover:text-white'
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                        {/* Kategoriye özel menüler */}
                        {businessCategory && categoryMenus[businessCategory]?.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href as Route}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                                        ? 'bg-purple-700 text-white'
                                        : 'text-purple-100 hover:bg-purple-700'
                                        }`}
                                >
                                    <item.icon className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive ? 'text-white' : 'text-purple-300 group-hover:text-white'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
} 