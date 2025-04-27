'use client';

import React from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import { Appointment } from '@/app/types/appointment';

interface AppointmentTableProps {
    appointments: Appointment[];
    onRefresh: () => void;
    searchTerm: string;
    filter: string;
    onEdit: (appointment: Appointment) => void;
}

const AppointmentTable = ({ appointments, onRefresh, searchTerm, filter, onEdit }: AppointmentTableProps) => {
    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = (
            appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const today = new Date().toISOString().split('T')[0];
        const appointmentDate = appointment.date;

        if (filter === 'today') {
            return matchesSearch && appointmentDate === today;
        } else if (filter === 'upcoming') {
            return matchesSearch && appointmentDate > today;
        }

        return matchesSearch;
    });

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Bekliyor':
                return 'bg-yellow-100 text-yellow-800';
            case 'Onaylandı':
                return 'bg-green-100 text-green-800';
            case 'İptal':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Müşteri
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
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            İşlemler
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {appointment.customerName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {appointment.service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {appointment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {appointment.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(appointment.status)}`}>
                                    {appointment.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button
                                    onClick={() => onEdit(appointment)}
                                    className="table-action-button"
                                >
                                    <FaEdit className="h-4 w-4 mr-1" />
                                    Düzenle
                                </button>
                                <button
                                    className="table-action-button"
                                >
                                    <FaEye className="h-4 w-4 mr-1" />
                                    Görüntüle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredAppointments.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-sm">Randevu bulunamadı</p>
                </div>
            )}
        </div>
    );
};

export default AppointmentTable; 