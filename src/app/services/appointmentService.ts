import { Appointment } from '../types/appointment';

// Simüle edilmiş veritabanı
let appointments: Appointment[] = [
    {
        id: '1',
        customerName: 'Ahmet Yılmaz',
        service: 'Saç Kesimi',
        date: '2024-03-20',
        time: '14:00',
        status: 'Onaylandı'
    },
    {
        id: '2',
        customerName: 'Ayşe Demir',
        service: 'Saç Boyama',
        date: '2024-03-21',
        time: '15:30',
        status: 'Bekliyor'
    }
];

export const AppointmentService = {
    getAll: async (): Promise<Appointment[]> => {
        return appointments;
    },

    create: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
        const newAppointment = {
            ...appointment,
            id: Math.random().toString(36).substr(2, 9)
        };
        appointments.push(newAppointment);
        return newAppointment;
    },

    update: async (id: string, appointment: Partial<Appointment>): Promise<Appointment | null> => {
        const index = appointments.findIndex(a => a.id === id);
        if (index === -1) return null;

        appointments[index] = { ...appointments[index], ...appointment };
        return appointments[index];
    },

    delete: async (id: string): Promise<boolean> => {
        const initialLength = appointments.length;
        appointments = appointments.filter(a => a.id !== id);
        return initialLength > appointments.length;
    }
}; 