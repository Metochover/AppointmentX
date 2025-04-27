'use client';

import React from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

interface Appointment {
    id: string;
    customerName: string;
    service: string;
    date: string;
    time: string;
    status: 'Bekliyor' | 'Onaylandı' | 'İptal';
}

interface AppointmentTableProps {
    appointments: Appointment[];
    onRefresh: () => void;
    searchTerm: string;
    filter: string;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
    appointments,
    onRefresh,
    searchTerm,
    filter
}) => {
    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            // API çağrısı yerine localStorage kullanıyoruz
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                const user = JSON.parse(currentUser);
                const updatedAppointments = user.appointments.map((apt: Appointment) =>
                    apt.id === id ? { ...apt, status: newStatus } : apt
                );
                user.appointments = updatedAppointments;
                localStorage.setItem('currentUser', JSON.stringify(user));
                onRefresh();
            }
        } catch (error) {
            console.error('Durum güncellenirken hata oluştu:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) {
            try {
                // API çağrısı yerine localStorage kullanıyoruz
                const currentUser = localStorage.getItem('currentUser');
                if (currentUser) {
                    const user = JSON.parse(currentUser);
                    const updatedAppointments = user.appointments.filter(
                        (apt: Appointment) => apt.id !== id
                    );
                    user.appointments = updatedAppointments;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    onRefresh();
                }
            } catch (error) {
                console.error('Randevu silinirken hata oluştu:', error);
            }
        }
    };

    // Filtreleme ve arama işlemleri
    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = (
            appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const today = new Date().toISOString().split('T')[0];

        switch (filter) {
            case 'today':
                return matchesSearch && appointment.date === today;
            case 'upcoming':
                return matchesSearch && appointment.date > today;
            default:
                return matchesSearch;
        }
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Müşteri Adı
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hizmet
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tarih
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Saat
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Durum
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            İşlemler
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.customerName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {appointment.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'Onaylandı'
                                        ? 'bg-green-100 text-green-800'
                                        : appointment.status === 'İptal'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {appointment.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button
                                    onClick={() => handleStatusChange(appointment.id, 'Onaylandı')}
                                    className="text-green-600 hover:text-green-900"
                                >
                                    <FaCheck className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(appointment.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredAppointments.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    Randevu bulunamadı.
                </div>
            )}
        </div>
    );
};

export default AppointmentTable; 