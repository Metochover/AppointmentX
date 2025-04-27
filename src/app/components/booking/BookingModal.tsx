'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaClock, FaMoneyBillWave } from 'react-icons/fa';

interface Service {
    id: string;
    name: string;
    duration: string;
    price: number;
}

interface Staff {
    id: string;
    name: string;
    title: string;
    services: string[];
}

interface Business {
    id: string;
    name: string;
    type: string;
    services: Service[];
    staff: Staff[];
}

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    business: Business;
}

export default function BookingModal({ isOpen, onClose, business }: BookingModalProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    // Seçilen servisi verebilen çalışanları filtrele
    const availableStaff = selectedService
        ? business.staff.filter(staff => staff.services.includes(selectedService.id))
        : [];

    // Bugünden itibaren 30 günlük tarih aralığı oluştur
    const availableDates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString().split('T')[0];
    });

    // Saat aralıkları (09:00 - 19:00)
    const timeSlots = Array.from({ length: 20 }, (_, i) => {
        const hour = Math.floor(i / 2) + 9;
        const minute = i % 2 === 0 ? '00' : '30';
        return `${hour.toString().padStart(2, '0')}:${minute}`;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) {
            alert('Lütfen tüm alanları doldurun');
            return;
        }

        // Randevu verilerini oluştur
        const appointmentData = {
            businessId: business.id,
            businessName: business.name,
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            staffId: selectedStaff.id,
            staffName: selectedStaff.name,
            date: selectedDate,
            time: selectedTime,
            customerName,
            customerPhone,
            status: 'Bekliyor'
        };

        // LocalStorage'a kaydet
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        alert('Randevunuz başarıyla oluşturuldu!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {business.name} - Randevu Al
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <FaTimes className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Hizmet Seçimi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hizmet Seçin
                            </label>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {business.services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => setSelectedService(service)}
                                        className={`p-4 border rounded-lg cursor-pointer ${selectedService?.id === service.id
                                                ? 'border-purple-500 bg-purple-50'
                                                : 'border-gray-200 hover:border-purple-500'
                                            }`}
                                    >
                                        <h3 className="font-medium">{service.name}</h3>
                                        <div className="mt-2 text-sm text-gray-500 flex items-center gap-4">
                                            <span className="flex items-center">
                                                <FaClock className="mr-1" />
                                                {service.duration}
                                            </span>
                                            <span className="flex items-center">
                                                <FaMoneyBillWave className="mr-1" />
                                                {service.price} TL
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Personel Seçimi */}
                        {selectedService && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Personel Seçin
                                </label>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {availableStaff.map((staff) => (
                                        <div
                                            key={staff.id}
                                            onClick={() => setSelectedStaff(staff)}
                                            className={`p-4 border rounded-lg cursor-pointer ${selectedStaff?.id === staff.id
                                                    ? 'border-purple-500 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-500'
                                                }`}
                                        >
                                            <h3 className="font-medium">{staff.name}</h3>
                                            <p className="text-sm text-gray-500">{staff.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tarih ve Saat Seçimi */}
                        {selectedStaff && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tarih Seçin
                                    </label>
                                    <select
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Tarih seçin</option>
                                        {availableDates.map((date) => (
                                            <option key={date} value={date}>
                                                {new Date(date).toLocaleDateString('tr-TR')}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Saat Seçin
                                    </label>
                                    <select
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Saat seçin</option>
                                        {timeSlots.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Müşteri Bilgileri */}
                        {selectedDate && selectedTime && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adınız Soyadınız
                                    </label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        required
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Telefon Numaranız
                                    </label>
                                    <input
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        required
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Randevu Oluştur Butonu */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                disabled={!selectedService || !selectedStaff || !selectedDate || !selectedTime || !customerName || !customerPhone}
                            >
                                Randevu Oluştur
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 