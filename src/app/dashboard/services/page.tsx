'use client';

import React, { useState } from 'react';
import { FaPlus, FaSearch, FaClock, FaMoneyBillWave } from 'react-icons/fa';

interface Service {
    id: string;
    name: string;
    duration: string;
    price: number;
    description: string;
}

const staticServices: Service[] = [
    {
        id: '1',
        name: 'Saç Kesimi',
        duration: '30 dk',
        price: 150,
        description: 'Profesyonel saç kesimi hizmeti'
    },
    {
        id: '2',
        name: 'Saç Boyama',
        duration: '120 dk',
        price: 400,
        description: 'Saç boyama ve bakım hizmeti'
    },
    {
        id: '3',
        name: 'Manikür',
        duration: '45 dk',
        price: 120,
        description: 'El tırnak bakımı ve ojesi'
    },
    {
        id: '4',
        name: 'Pedikür',
        duration: '45 dk',
        price: 150,
        description: 'Ayak tırnak bakımı ve ojesi'
    },
    {
        id: '5',
        name: 'Cilt Bakımı',
        duration: '60 dk',
        price: 300,
        description: 'Derin cilt temizliği ve bakımı'
    }
];

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [services, setServices] = useState<Service[]>(staticServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const handleAddService = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleEditService = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleDeleteService = (serviceId: string) => {
        if (window.confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
            const updatedServices = services.filter(service => service.id !== serviceId);
            setServices(updatedServices);
        }
    };

    const handleSaveService = (serviceData: Omit<Service, 'id'>) => {
        if (editingService) {
            // Mevcut hizmeti güncelle
            const updatedServices = services.map(service =>
                service.id === editingService.id
                    ? { ...serviceData, id: editingService.id }
                    : service
            );
            setServices(updatedServices);
        } else {
            // Yeni hizmet ekle
            const newService = {
                ...serviceData,
                id: Date.now().toString()
            };
            setServices([...services, newService]);
        }
        setIsModalOpen(false);
        setEditingService(null);
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Hizmetler</h1>
                    <button
                        onClick={handleAddService}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                        Yeni Hizmet
                    </button>
                </div>

                <div className="mt-4">
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Hizmet ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {service.name}
                                        </h3>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-gray-500">
                                    {service.description}
                                </p>
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <FaClock className="mr-1.5 h-4 w-4" />
                                        {service.duration}
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-gray-900">
                                        <FaMoneyBillWave className="mr-1.5 h-4 w-4 text-green-500" />
                                        {service.price} ₺
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3">
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => handleEditService(service)}
                                        className="text-sm font-medium text-purple-600 hover:text-purple-500"
                                    >
                                        Düzenle
                                    </button>
                                    <button
                                        onClick={() => handleDeleteService(service.id)}
                                        className="text-sm font-medium text-red-600 hover:text-red-500"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hizmet Ekleme/Düzenleme Modalı */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingService ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
                        </h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const serviceData = {
                                name: formData.get('name') as string,
                                duration: formData.get('duration') as string,
                                price: Number(formData.get('price')),
                                description: formData.get('description') as string,
                            };
                            handleSaveService(serviceData);
                        }}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hizmet Adı
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={editingService?.name}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Süre
                                    </label>
                                    <input
                                        type="text"
                                        name="duration"
                                        defaultValue={editingService?.duration}
                                        required
                                        placeholder="örn: 30 dk"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Fiyat (₺)
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={editingService?.price}
                                        required
                                        min="0"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Açıklama
                                    </label>
                                    <textarea
                                        name="description"
                                        defaultValue={editingService?.description}
                                        required
                                        rows={3}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingService(null);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                                >
                                    {editingService ? 'Güncelle' : 'Ekle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 