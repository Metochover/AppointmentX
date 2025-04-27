'use client';

import React, { useState } from 'react';
import { FaSearch, FaUserPlus } from 'react-icons/fa';

interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    lastVisit: string;
    totalVisits: number;
    totalSpent: number;
}

const staticCustomers: Customer[] = [
    {
        id: '1',
        name: 'Ahmet Yılmaz',
        phone: '0532 111 2233',
        email: 'ahmet@email.com',
        lastVisit: '2024-02-15',
        totalVisits: 8,
        totalSpent: 1200
    },
    {
        id: '2',
        name: 'Ayşe Kaya',
        phone: '0533 222 3344',
        email: 'ayse@email.com',
        lastVisit: '2024-02-18',
        totalVisits: 12,
        totalSpent: 2400
    },
    {
        id: '3',
        name: 'Mehmet Demir',
        phone: '0535 333 4455',
        email: 'mehmet@email.com',
        lastVisit: '2024-02-10',
        totalVisits: 5,
        totalSpent: 800
    },
    {
        id: '4',
        name: 'Zeynep Şahin',
        phone: '0536 444 5566',
        email: 'zeynep@email.com',
        lastVisit: '2024-02-19',
        totalVisits: 15,
        totalSpent: 3000
    },
    {
        id: '5',
        name: 'Can Öztürk',
        phone: '0537 555 6677',
        email: 'can@email.com',
        lastVisit: '2024-02-17',
        totalVisits: 3,
        totalSpent: 450
    }
];

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState<Customer[]>(staticCustomers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const handleAddCustomer = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleSaveCustomer = (customerData: Omit<Customer, 'id' | 'lastVisit' | 'totalVisits' | 'totalSpent'>) => {
        const newCustomer = {
            ...customerData,
            id: Date.now().toString(),
            lastVisit: new Date().toISOString().split('T')[0],
            totalVisits: 0,
            totalSpent: 0
        };
        setCustomers([...customers, newCustomer]);
        setIsModalOpen(false);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Müşteriler</h1>
                    <button
                        onClick={handleAddCustomer}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <FaUserPlus className="-ml-1 mr-2 h-5 w-5" />
                        Yeni Müşteri
                    </button>
                </div>

                <div className="mt-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Müşteri ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                        Müşteri
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Telefon
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        E-posta
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Son Ziyaret
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Toplam Ziyaret
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Toplam Harcama
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                            {customer.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {customer.phone}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {customer.email}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {new Date(customer.lastVisit).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {customer.totalVisits}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {customer.totalSpent} ₺
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Müşteri Ekleme Modalı */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Yeni Müşteri Ekle</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const customerData = {
                                name: formData.get('name') as string,
                                phone: formData.get('phone') as string,
                                email: formData.get('email') as string,
                            };
                            handleSaveCustomer(customerData);
                        }}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Müşteri Adı
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="0532 xxx xxxx"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        E-posta
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                                >
                                    Ekle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 