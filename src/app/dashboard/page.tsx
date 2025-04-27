'use client';

import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUsers, FaCut, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface DashboardStats {
    todayAppointments: number;
    totalCustomers: number;
    activeServices: number;
    monthlyRevenue: number;
}

// Statik randevu verileri
const recentAppointments = [
    { id: 1, customerName: 'Ahmet Yılmaz', service: 'Saç Kesimi', date: '2024-02-20', time: '14:30' },
    { id: 2, customerName: 'Ayşe Kaya', service: 'Saç Boyama', date: '2024-02-20', time: '15:00' },
    { id: 3, customerName: 'Mehmet Demir', service: 'Sakal Tıraşı', date: '2024-02-21', time: '10:00' },
    { id: 4, customerName: 'Zeynep Şahin', service: 'Manikür', date: '2024-02-21', time: '11:30' },
];

// Popüler hizmetler
const popularServices = [
    { name: 'Saç Kesimi', count: 45 },
    { name: 'Sakal Tıraşı', count: 32 },
    { name: 'Saç Boyama', count: 28 },
    { name: 'Manikür', count: 20 },
];

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        todayAppointments: 5,
        totalCustomers: 128,
        activeServices: 12,
        monthlyRevenue: 4250
    });

    // Gelir grafiği verileri
    const revenueData = {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
        datasets: [{
            label: 'Aylık Gelir (₺)',
            data: [3200, 3800, 4100, 4250, 4500, 4800],
            backgroundColor: 'rgba(147, 51, 234, 0.5)',
            borderColor: 'rgb(147, 51, 234)',
            borderWidth: 1
        }]
    };

    // Randevu dağılım grafiği verileri
    const appointmentDistributionData = {
        labels: ['Saç Kesimi', 'Sakal Tıraşı', 'Saç Boyama', 'Manikür'],
        datasets: [{
            data: [45, 32, 28, 20],
            backgroundColor: [
                'rgba(147, 51, 234, 0.7)',
                'rgba(59, 130, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(239, 68, 68, 0.7)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Gösterge Paneli</h1>
                </div>

                {/* İstatistik Kartları */}
                <div className="mt-8">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Bugünkü Randevular */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <FaCalendarAlt className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Bugünkü Randevular
                                            </dt>
                                            <dd className="flex items-baseline">
                                                <div className="text-2xl font-semibold text-gray-900">{stats.todayAppointments}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Toplam Müşteri */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <FaUsers className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Toplam Müşteri
                                            </dt>
                                            <dd className="flex items-baseline">
                                                <div className="text-2xl font-semibold text-gray-900">{stats.totalCustomers}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Aktif Hizmetler */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <FaCut className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Aktif Hizmetler
                                            </dt>
                                            <dd className="flex items-baseline">
                                                <div className="text-2xl font-semibold text-gray-900">{stats.activeServices}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Aylık Gelir */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <FaChartBar className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Aylık Gelir
                                            </dt>
                                            <dd className="flex items-baseline">
                                                <div className="text-2xl font-semibold text-gray-900">₺{stats.monthlyRevenue}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grafikler ve Listeler Grid */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Gelir Grafiği */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Aylık Gelir Analizi</h2>
                        <Bar data={revenueData} options={{ responsive: true }} />
                    </div>

                    {/* Randevu Dağılım Grafiği */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Randevu Dağılımı</h2>
                        <Pie data={appointmentDistributionData} options={{ responsive: true }} />
                    </div>

                    {/* Son Randevular Listesi */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Son Randevular</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hizmet</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saat</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentAppointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.customerName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.service}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Popüler Hizmetler Listesi */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Popüler Hizmetler</h2>
                        <div className="space-y-4">
                            {popularServices.map((service, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FaCut className="h-5 w-5 text-purple-600 mr-3" />
                                        <span className="text-sm font-medium text-gray-900">{service.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500">{service.count} randevu</span>
                                        <div
                                            className="ml-2 h-2 w-24 bg-gray-200 rounded-full overflow-hidden"
                                            title={`${(service.count / Math.max(...popularServices.map(s => s.count)) * 100).toFixed(0)}%`}
                                        >
                                            <div
                                                className="h-full bg-purple-600"
                                                style={{
                                                    width: `${(service.count / Math.max(...popularServices.map(s => s.count)) * 100)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 