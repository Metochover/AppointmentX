'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Employee {
    id: number;
    name: string;
    position: string;
    email: string;
    phone: string;
    specialization: string[];
    status: 'active' | 'inactive';
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (employeeData: Omit<Employee, 'id'>) => void;
    editData?: Employee;
}

const specializations = [
    'Saç Kesimi',
    'Saç Boyama',
    'Fön',
    'Manikür',
    'Pedikür',
    'Cilt Bakımı',
    'Makyaj',
    'Kaş Tasarımı',
    'Sakal Tıraşı'
];

const positions = [
    'Kuaför',
    'Stilist',
    'Güzellik Uzmanı',
    'Manikür Uzmanı',
    'Cilt Bakım Uzmanı',
    'Makyaj Uzmanı'
];

export default function EmployeeModal({ isOpen, onClose, onSubmit, editData }: EmployeeModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        email: '',
        phone: '',
        specialization: [] as string[],
        status: 'active' as 'active' | 'inactive'
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name,
                position: editData.position,
                email: editData.email,
                phone: editData.phone,
                specialization: editData.specialization,
                status: editData.status
            });
        } else {
            setFormData({
                name: '',
                position: '',
                email: '',
                phone: '',
                specialization: [],
                status: 'active'
            });
        }
    }, [editData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSpecializationChange = (specialization: string) => {
        setFormData(prev => ({
            ...prev,
            specialization: prev.specialization.includes(specialization)
                ? prev.specialization.filter(s => s !== specialization)
                : [...prev.specialization, specialization]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        {editData ? 'Çalışan Düzenle' : 'Yeni Çalışan Ekle'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Ad Soyad
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Pozisyon
                        </label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="">Seçiniz</option>
                            {positions.map(position => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            E-posta
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Telefon
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Uzmanlık Alanları
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {specializations.map(specialization => (
                                <label key={specialization} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.specialization.includes(specialization)}
                                        onChange={() => handleSpecializationChange(specialization)}
                                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{specialization}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Durum
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="active">Aktif</option>
                            <option value="inactive">Pasif</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                        >
                            {editData ? 'Güncelle' : 'Ekle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 