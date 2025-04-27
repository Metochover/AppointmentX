'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Test hesapları
        const testAccounts = [
            { email: 'owner@example.com', password: 'test123', role: 'owner' },
            { email: 'employee@example.com', password: 'test123', role: 'employee' }
        ];

        try {
            const account = testAccounts.find(acc => acc.email === formData.email && acc.password === formData.password);

            if (account) {
                const user = {
                    id: '1',
                    email: account.email,
                    role: account.role,
                    businessName: 'Test İşletme',
                    phoneNumber: '555-0123'
                };

                localStorage.setItem('currentUser', JSON.stringify(user));

                // Role göre yönlendirme
                if (account.role === 'owner') {
                    router.push('/dashboard');
                } else {
                    router.push('/employee-dashboard');
                }
            } else {
                setError('Geçersiz e-posta veya şifre');
            }
        } catch (err) {
            setError('Giriş yapılırken bir hata oluştu');
        }

        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {error && (
                <div className="error-alert" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="form-group">
                <label htmlFor="email" className="form-label">
                    E-posta Adresi
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-label">
                    Şifre
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>

            <div className="mt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="form-button"
                >
                    {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>Test hesapları:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>İşletme Sahibi: owner@example.com / test123</li>
                    <li>Çalışan: employee@example.com / test123</li>
                </ul>
            </div>
        </form>
    );
};

export default LoginForm; 