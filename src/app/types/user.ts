export type UserRole = 'owner' | 'employee';

export interface User {
    id: string;
    email: string;
    businessName?: string;
    phoneNumber: string;
    role: UserRole;
    employeeId?: string;
    businessId?: string;
} 