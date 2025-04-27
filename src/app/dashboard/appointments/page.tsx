'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import AppointmentTable from '@/app/components/appointments/AppointmentTable';
import AppointmentModal from '@/app/components/appointments/AppointmentModal';
import { Appointment, AppointmentData } from '@/app/types/appointment';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-black-days.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { tr } from 'date-fns/locale/tr';

// Statik randevu verileri
const staticAppointments: Appointment[] = [
    {
        id: '1',
        customerName: 'Ahmet Yılmaz',
        service: 'Saç Kesimi',
        date: '2024-03-20',
        time: '14:00',
        status: 'Bekliyor'
    },
    {
        id: '2',
        customerName: 'Ayşe Demir',
        service: 'Saç Boyama',
        date: '2024-03-21',
        time: '15:30',
        status: 'Onaylandı'
    }
];

interface User {
    id: string;
    email: string;
    businessName: string;
    phoneNumber: string;
    appointments: Appointment[];
}

const locales = {
    'tr': tr,
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const toCalendarEvents = (appointments: Appointment[]) =>
    appointments.map(apt => ({
        title: `${apt.customerName} - ${apt.service}`,
        start: new Date(`${apt.date}T${apt.time}`),
        end: new Date(`${apt.date}T${apt.time}`),
        allDay: false,
        resource: apt,
    }));

export default function AppointmentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[]>(staticAppointments);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    const handleRefresh = () => {
        setLoading(true);
        // API çağrısı burada yapılacak
        setTimeout(() => {
            setAppointments(staticAppointments);
            setLoading(false);
        }, 500);
    };

    const handleCreateAppointment = () => {
        setEditingAppointment(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAppointment(null);
    };

    const handleAppointmentSubmit = (appointmentData: AppointmentData) => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user: User = JSON.parse(currentUser);
            const newAppointment: Appointment = {
                ...appointmentData,
                id: Date.now().toString()
            };

            // Çakışma kontrolü
            const isConflict = appointments.some(apt =>
                apt.date === newAppointment.date &&
                apt.time === newAppointment.time &&
                (!editingAppointment || apt.id !== editingAppointment.id)
            );
            if (isConflict) {
                alert('Bu tarih ve saatte başka bir randevu mevcut! Lütfen farklı bir zaman seçin.');
                return;
            }

            if (editingAppointment) {
                // Randevu güncelleme
                const updatedAppointments = appointments.map(apt =>
                    apt.id === editingAppointment.id ? newAppointment : apt
                );
                user.appointments = updatedAppointments;
                setAppointments(updatedAppointments);
            } else {
                // Yeni randevu ekleme
                const updatedAppointments = [...appointments, newAppointment];
                user.appointments = updatedAppointments;
                setAppointments(updatedAppointments);
            }

            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        handleCloseModal();
    };

    const handleEdit = (appointment: Appointment) => {
        setEditingAppointment(appointment);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Randevular</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Tüm randevularınızı buradan yönetebilirsiniz
                        </p>
                    </div>
                    <button
                        className="button-primary flex items-center"
                        onClick={handleCreateAppointment}
                    >
                        <FaPlus className="mr-2" />
                        Yeni Randevu
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex space-x-2">
                        <button
                            className={`filter-tab ${filter === 'all' ? 'filter-tab-active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Tümü
                        </button>
                        <button
                            className={`filter-tab ${filter === 'today' ? 'filter-tab-active' : ''}`}
                            onClick={() => setFilter('today')}
                        >
                            Bugün
                        </button>
                        <button
                            className={`filter-tab ${filter === 'upcoming' ? 'filter-tab-active' : ''}`}
                            onClick={() => setFilter('upcoming')}
                        >
                            Gelecek
                        </button>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Müşteri veya hizmet ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="bg-white rounded-lg shadow p-4 mb-8">
                    <Calendar
                        localizer={localizer}
                        events={toCalendarEvents(appointments)}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        messages={{
                            week: 'Hafta',
                            work_week: 'İş Haftası',
                            day: 'Gün',
                            month: 'Ay',
                            previous: 'Geri',
                            next: 'İleri',
                            today: 'Bugün',
                            agenda: 'Ajanda',
                            date: 'Tarih',
                            time: 'Saat',
                            event: 'Randevu',
                            noEventsInRange: 'Bu aralıkta randevu yok',
                            showMore: (total: any) => `+${total} daha`,
                        }}
                        popup
                        views={['month', 'week', 'day', 'agenda']}
                        culture="tr"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading-spinner-large" />
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <AppointmentTable
                        appointments={appointments}
                        onRefresh={handleRefresh}
                        searchTerm={searchTerm}
                        filter={filter}
                        onEdit={handleEdit}
                    />
                </div>
            )}

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleAppointmentSubmit}
                editData={editingAppointment ? {
                    customerName: editingAppointment.customerName,
                    service: editingAppointment.service,
                    date: editingAppointment.date,
                    time: editingAppointment.time,
                    status: editingAppointment.status
                } : undefined}
            />
        </div>
    );
}