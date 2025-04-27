export type AppointmentStatus = 'Bekliyor' | 'Onaylandı' | 'İptal';

export interface AppointmentData {
    customerName: string;
    service: string;
    date: string;
    time: string;
    status: AppointmentStatus;
}

export interface Appointment extends AppointmentData {
    id: string;
}
