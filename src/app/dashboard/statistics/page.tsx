'use client';

import React from 'react';
import { FaUsers, FaCalendarCheck, FaMoneyBillWave, FaClock } from 'react-icons/fa';

const stats = [
    {
        id: 1,
        name: 'Toplam Müşteri',
        value: '256',
        change: '+12%',
        changeType: 'increase',
        icon: FaUsers,
    },
    {
        id: 2,
        name: 'Aylık Randevu',
        value: '182',
        change: '+8%',
        changeType: 'increase',
        icon: FaCalendarCheck,
    },
    {
        id: 3,
        name: 'Aylık Gelir',
        value: '24.500 ₺',
        change: '+15%',
        changeType: 'increase',
        icon: FaMoneyBillWave,
    },
    {
        id: 4,
        name: 'Ortalama Süre',
        value: '45 dk',
        change: '-5%',
        changeType: 'decrease',
        icon: FaClock,
    },
];

const monthlyData = [
    { month: 'Ocak', appointments: 150, revenue: 20000 },
    { month: 'Şubat', appointments: 182, revenue: 24500 },
    { month: 'Mart', appointments: 165, revenue: 22000 },
    { month: 'Nisan', appointments: 190, revenue: 26000 },
    { month: 'Mayıs', appointments: 210, revenue: 28500 },
    { month: 'Haziran', appointments: 205, revenue: 27500 },
];

const popularServices = [
    { name: 'Saç Kesimi', count: 85, revenue: 12750 },
    { name: 'Saç Boyama', count: 45, revenue: 18000 },
    { name: 'Manikür', count: 62, revenue: 7440 },
    { name: 'Pedikür', count: 48, revenue: 7200 },
    { name: 'Cilt Bakımı', count: 35, revenue: 10500 },
];

export default function StatisticsPage() {
    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">İstatistikler</h1>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white overflow-hidden shadow rounded-lg"
                        >
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <item.icon className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                {item.name}
                                            </dt>
                                            <dd className="flex items-baseline">
                                                <div className="text-2xl font-semibold text-gray-900">
                                                    {item.value}
                                                </div>
                                                <div
                                                    className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'increase'
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                        }`}
                                                >
                                                    {item.change}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Monthly Data */}
                <div className="mt-8 bg-white shadow rounded-lg">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Aylık Performans
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ay
                                                </th>
                                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Randevu Sayısı
                                                </th>
                                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Gelir
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {monthlyData.map((month, idx) => (
                                                <tr key={month.month}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {month.month}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                                                        {month.appointments}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                        {month.revenue.toLocaleString()} ₺
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Services */}
                <div className="mt-8 bg-white shadow rounded-lg">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Popüler Hizmetler
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hizmet
                                                </th>
                                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Randevu Sayısı
                                                </th>
                                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Toplam Gelir
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {popularServices.map((service) => (
                                                <tr key={service.name}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {service.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                                                        {service.count}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                                                        {service.revenue.toLocaleString()} ₺
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 