'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/app/types/user';
import type { Route } from 'next';

const CATEGORIES = [
    'Kuaför & Güzellik',
    'Diş & Sağlık',
    'Spor & Fitness',
    'Veteriner',
    'Psikolog',
    'Fizyoterapist',
];

const RegisterForm = () => {
    const router = useRouter();
    const [userType, setUserType] = useState<'customer' | 'business'>('customer');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        businessCategory: '',
        phoneNumber: '',
        fullName: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        setLoading(true);

        if (userType === 'business') {
            const staticUser = {
                id: Date.now().toString(),
                email: formData.email,
                businessName: formData.businessName,
                businessCategory: formData.businessCategory,
                phoneNumber: formData.phoneNumber,
                role: 'owner' as UserRole,
                type: 'business',
            };
            localStorage.setItem('currentUser', JSON.stringify(staticUser));
            localStorage.setItem('userType', 'business');
            router.push('/dashboard' as Route);
        } else {
            const staticCustomer = {
                id: Date.now().toString(),
                email: formData.email,
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                role: 'customer' as UserRole,
                type: 'customer',
            };
            localStorage.setItem('currentUser', JSON.stringify(staticCustomer));
            localStorage.setItem('userType', 'customer');
            router.push('/customer-dashboard' as Route);
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <div className="flex justify-center mb-6 gap-4">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md font-medium ${userType === 'customer' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setUserType('customer')}
                >
                    Müşteri Kaydı
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md font-medium ${userType === 'business' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setUserType('business')}
                >
                    İşletme Kaydı
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {userType === 'business' ? (
                    <>
                        <div>
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                                İşletme Adı
                            </label>
                            <div className="mt-1">
                                <input
                                    id="businessName"
                                    name="businessName"
                                    type="text"
                                    required
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700">
                                Kategori
                            </label>
                            <select
                                id="businessCategory"
                                name="businessCategory"
                                required
                                value={formData.businessCategory}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="">Kategori Seçin</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Adınız Soyadınız
                            </label>
                            <div className="mt-1">
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </>
                )}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-posta Adresi
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Telefon Numarası
                    </label>
                    <div className="mt-1">
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            required
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Şifre
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Şifre Tekrar
                    </label>
                    <div className="mt-1">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                    >
                        {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm; 