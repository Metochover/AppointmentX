'use client';

import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form gönderme işlemi burada yapılacak
        console.log('Form data:', formData);
        alert('Mesajınız alındı. En kısa sürede size dönüş yapacağız.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        İletişime Geçin
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Sorularınız için bize ulaşın. En kısa sürede size dönüş yapacağız.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                    {/* İletişim Bilgileri */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">İletişim Bilgileri</h3>
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <FaPhone className="h-6 w-6 text-purple-600" />
                                <span className="ml-4 text-gray-600">+90 (555) 123 45 67</span>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="h-6 w-6 text-purple-600" />
                                <span className="ml-4 text-gray-600">info@appointx.com</span>
                            </div>
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="h-6 w-6 text-purple-600" />
                                <span className="ml-4 text-gray-600">
                                    Merkez Mahallesi, İstiklal Caddesi No:123<br />
                                    Şişli/İstanbul
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* İletişim Formu */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Adınız Soyadınız
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-posta Adresiniz
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                Konu
                            </label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Mesajınız
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            Gönder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 