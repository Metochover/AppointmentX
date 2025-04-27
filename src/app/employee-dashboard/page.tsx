'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import type { Appointment, AppointmentStatus } from '@/app/types/appointment';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-black-days.css';
import { format as formatDateFns, parse, startOfWeek, getDay } from 'date-fns';
import { tr } from 'date-fns/locale/tr';

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const initialAppointments: Appointment[] = [
    {
        id: '1',
        customerName: 'Ahmet Yılmaz',
        service: 'Saç Kesimi',
        date: formatDate(new Date()), // Today
        time: '14:00',
        status: 'Onaylandı'
    },
    {
        id: '2',
        customerName: 'Ayşe Demir',
        service: 'Saç Boyama',
        date: formatDate(new Date(Date.now() + 86400000)), // Tomorrow
        time: '15:30',
        status: 'Bekliyor'
    },
    {
        id: '3',
        customerName: 'Mehmet Kaya',
        service: 'Manikür',
        date: formatDate(new Date(Date.now() + 2 * 86400000)), // Day after tomorrow
        time: '11:00',
        status: 'Bekliyor'
    },
    {
        id: '4',
        customerName: 'Fatma Şahin',
        service: 'Pedikür',
        date: formatDate(new Date()), // Today
        time: '16:00',
        status: 'İptal'
    },
    {
        id: '5',
        customerName: 'Ali Veli',
        service: 'Saç Yıkama',
        date: formatDate(new Date(Date.now() + 86400000)), // Tomorrow
        time: '09:00',
        status: 'Bekliyor'
    },
    {
        id: '6',
        customerName: 'Zeynep Güneş',
        service: 'Fön',
        date: formatDate(new Date()), // Today
        time: '10:30',
        status: 'Onaylandı'
    },
    {
        id: '7',
        customerName: 'Mustafa Yıldız',
        service: 'Sakal Tıraşı',
        date: formatDate(new Date(Date.now() + 3 * 86400000)), // In 3 days
        time: '13:00',
        status: 'Bekliyor'
    },
    {
        id: '8',
        customerName: 'Elif Çetin',
        service: 'Kaş Dizayn',
        date: formatDate(new Date(Date.now() - 86400000)), // Yesterday (for testing past dates)
        time: '17:00',
        status: 'Onaylandı' // Assuming past appointments are completed/confirmed
    },
    {
        id: '9',
        customerName: 'Hasan Demirtaş',
        service: 'Saç Kesimi',
        date: formatDate(new Date(Date.now() + 4 * 86400000)), // In 4 days
        time: '12:00',
        status: 'Bekliyor'
    },
    {
        id: '10',
        customerName: 'Selin Arslan',
        service: 'Saç Boyama',
        date: formatDate(new Date()), // Today
        time: '18:00',
        status: 'Bekliyor'
    },
];

// Function to get the correct CSS class for status badge
const getStatusBadgeClass = (status: AppointmentStatus): string => {
    switch (status) {
        case 'Onaylandı': return 'status-onaylandı';
        case 'Bekliyor': return 'status-bekliyor';
        case 'İptal': return 'status-iptal';
        default: return 'bg-gray-100 text-gray-800'; // Fallback
    }
};

const locales = { 'tr': tr };
const localizer = dateFnsLocalizer({
    format: formatDateFns,
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

export default function EmployeeDashboard() {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
    const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'tomorrow'>('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Handle status change from dropdown
    const handleStatusChange = (appointmentId: string, newStatus: AppointmentStatus) => {
        setAppointments(prevAppointments =>
            prevAppointments.map(apt =>
                apt.id === appointmentId ? { ...apt, status: newStatus } : apt
            )
        );
        // TODO: Add API call here to update status on the server
    };

    const filteredAppointments = appointments.filter(appointment => {
        // Filter by search term
        const matchesSearch = appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by status
        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;

        // Filter by quick date buttons (Today, Tomorrow)
        let matchesQuickDate = true;
        const today = formatDate(new Date());
        const tomorrow = formatDate(new Date(Date.now() + 86400000));

        if (dateFilter === 'today') {
            matchesQuickDate = appointment.date === today;
        } else if (dateFilter === 'tomorrow') {
            matchesQuickDate = appointment.date === tomorrow;
        }

        // Filter by date range inputs
        let matchesDateRange = true;
        if (startDate && endDate) {
            matchesDateRange = appointment.date >= startDate && appointment.date <= endDate;
        } else if (startDate) {
            matchesDateRange = appointment.date >= startDate;
        } else if (endDate) {
            matchesDateRange = appointment.date <= endDate;
        }

        return matchesSearch && matchesStatus && matchesQuickDate && matchesDateRange;
    });

    // Reset date range when quick filter is clicked
    useEffect(() => {
        if (dateFilter !== 'all') {
            setStartDate('');
            setEndDate('');
        }
    }, [dateFilter]);

    // Reset quick filter when date range is used
    useEffect(() => {
        if (startDate || endDate) {
            setDateFilter('all');
        }
    }, [startDate, endDate]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Randevularım</h1>
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

                {/* Filters Section - Improved Alignment */}
                <div className="bg-white p-5 rounded-lg shadow-md mb-6">
                    <div className="flex flex-wrap gap-4">
                        {/* Satır 1: Arama, Tarih Aralığı, Hızlı Tarih */}
                        <div className="flex flex-1 gap-4 min-w-0">
                            {/* Column 1: Search */}
                            <div className="flex-1 min-w-[180px]">
                                <label htmlFor="search" className="form-label">Müşteri Ara</label>
                                <div className="relative mt-1">
                                    <input
                                        id="search"
                                        type="text"
                                        placeholder="Müşteri adını girin..."
                                        className="form-input pl-10 h-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            {/* Column 2: Date Range */}
                            <div className="flex-1 min-w-[180px]">
                                <label className="form-label">Tarih Aralığı Seç</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="relative flex-1">
                                        <input
                                            id="startDate"
                                            type="date"
                                            className="form-input pr-8 h-10"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            max={endDate || undefined}
                                        />
                                        <FaCalendarAlt className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                    <span className="text-gray-500">-</span>
                                    <div className="relative flex-1">
                                        <input
                                            id="endDate"
                                            type="date"
                                            className="form-input pr-8 h-10"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate || undefined}
                                        />
                                        <FaCalendarAlt className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            {/* Column 3: Quick Date Filters */}
                            <div className="flex-1 min-w-0">
                                <label className="form-label">Hızlı Tarih</label>
                                <div className="flex gap-2 mt-1 flex-nowrap overflow-x-auto">
                                    <button
                                        onClick={() => setDateFilter('all')}
                                        className={`filter-button h-10 ${dateFilter === 'all' ? 'filter-button-active-purple' : 'filter-button-inactive'}`}
                                    >
                                        Tümü
                                    </button>
                                    <button
                                        onClick={() => setDateFilter('today')}
                                        className={`filter-button h-10 ${dateFilter === 'today' ? 'filter-button-active-purple' : 'filter-button-inactive'}`}
                                    >
                                        Bugün
                                    </button>
                                    <button
                                        onClick={() => setDateFilter('tomorrow')}
                                        className={`filter-button h-10 ${dateFilter === 'tomorrow' ? 'filter-button-active-purple' : 'filter-button-inactive'}`}
                                    >
                                        Yarın
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Satır 2: Durum Filtresi */}
                        <div className="flex w-full mt-2">
                            <div className="flex-1 min-w-[180px]">
                                <label htmlFor="statusFilter" className="form-label">Durum Filtresi</label>
                                <select
                                    id="statusFilter"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'all')}
                                    className="form-select w-full mt-1 shadow-sm h-10"
                                >
                                    <option value="all">Tümü</option>
                                    <option value="Bekliyor">Bekliyor</option>
                                    <option value="Onaylandı">Onaylandı</option>
                                    <option value="İptal">İptal</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="table-header">Müşteri</th>
                                    <th className="table-header">Hizmet</th>
                                    <th className="table-header">Tarih</th>
                                    <th className="table-header">Saat</th>
                                    <th className="table-header">Durum</th>
                                    <th className="table-header">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((appointment) => (
                                        <tr key={appointment.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="table-cell font-medium text-gray-900">{appointment.customerName}</td>
                                            <td className="table-cell">{appointment.service}</td>
                                            <td className="table-cell">{appointment.date}</td>
                                            <td className="table-cell">{appointment.time}</td>
                                            <td className="table-cell">
                                                {/* Using helper function for badge class */}
                                                <span className={`status-badge ${getStatusBadgeClass(appointment.status)}`}>{appointment.status}</span>
                                            </td>
                                            <td className="table-cell" style={{ minWidth: '120px' }}>
                                                <select
                                                    value={appointment.status}
                                                    onChange={(e) => handleStatusChange(appointment.id, e.target.value as AppointmentStatus)}
                                                    className="form-select w-full p-1.5 text-sm shadow-sm"
                                                >
                                                    <option value="Bekliyor">Bekliyor</option>
                                                    <option value="Onaylandı">Onaylandı</option>
                                                    <option value="İptal">İptal</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-500">
                                            <FaFilter className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                            Filtreye uygun randevu bulunamadı.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}