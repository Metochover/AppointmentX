'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { User } from '@/app/types/user';

interface Employee {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    role: 'employee';
    businessId: string;
    status: 'active' | 'inactive';
    password?: string;
}

interface EmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Employee, 'id' | 'role' | 'businessId'>) => void;
    editData?: Employee;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState<{
        email: string;
        name: string;
        phoneNumber: string;
        status: 'active' | 'inactive';
        password: string;
        confirmPassword: string;
    }>({
        email: '',
        name: '',
        phoneNumber: '',
        status: 'active',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (editData) {
            setFormData({
                email: editData.email || '',
                name: editData.name || '',
                phoneNumber: editData.phoneNumber || '',
                status: editData.status ?? 'active',
                password: '',
                confirmPassword: ''
            });
        } else {
            setFormData({
                email: '',
                name: '',
                phoneNumber: '',
                status: 'active',
                password: '',
                confirmPassword: ''
            });
        }
        setError('');
    }, [editData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!editData && (!formData.password || formData.password.length < 6)) {
            setError('Şifre en az 6 karakter olmalıdır');
            return;
        }

        if (!editData && formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Geçerli bir e-posta adresi giriniz');
            return;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
            setError('Geçerli bir telefon numarası giriniz');
            return;
        }

        const submitData = {
            email: formData.email,
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            status: formData.status as 'active' | 'inactive',
            ...(formData.password ? { password: formData.password } : {})
        };

        onSubmit(submitData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900">
                        {editData ? 'Çalışan Düzenle' : 'Yeni Çalışan Ekle'}
                    </h3>
                    {error && (
                        <div className="mt-2 p-2 text-sm text-red-600 bg-red-100 rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mt-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Ad Soyad
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-posta
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Durum
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Pasif</option>
                            </select>
                        </div>
                        {!editData && (
                            <>
                                <div className="mt-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Şifre
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                        required={!editData}
                                        minLength={6}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Şifre Tekrar
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                        required={!editData}
                                        minLength={6}
                                    />
                                </div>
                            </>
                        )}
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                {editData ? 'Güncelle' : 'Ekle'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            const user = JSON.parse(userData);
            setCurrentUser(user);

            const storedEmployees = localStorage.getItem(`employees_${user.id}`);
            if (storedEmployees) {
                setEmployees(JSON.parse(storedEmployees));
            }
        }
    }, []);

    const handleAddEmployee = (data: Omit<Employee, 'id' | 'role' | 'businessId'>) => {
        if (!currentUser) return;

        const newEmployee: Employee = {
            ...data,
            id: Date.now().toString(),
            role: 'employee',
            businessId: currentUser.id
        };

        const updatedEmployees = [...employees, newEmployee];
        setEmployees(updatedEmployees);
        localStorage.setItem(`employees_${currentUser.id}`, JSON.stringify(updatedEmployees));
    };

    const handleEditEmployee = (data: Omit<Employee, 'id' | 'role' | 'businessId'>) => {
        if (!currentUser || !editingEmployee) return;

        const updatedEmployees = employees.map(emp =>
            emp.id === editingEmployee.id
                ? { ...emp, ...data }
                : emp
        );

        setEmployees(updatedEmployees);
        localStorage.setItem(`employees_${currentUser.id}`, JSON.stringify(updatedEmployees));
        setEditingEmployee(null);
    };

    const handleDeleteEmployee = (id: string) => {
        if (!currentUser) return;

        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
        localStorage.setItem(`employees_${currentUser.id}`, JSON.stringify(updatedEmployees));
    };

    const handleSubmit = (employeeData: Omit<Employee, 'id' | 'role' | 'businessId'>) => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            const newEmployee = {
                ...employeeData,
                id: editingEmployee ? editingEmployee.id : Date.now().toString(),
                role: 'employee' as const,
                businessId: user.id,
                email: employeeData.email.trim(),
                name: employeeData.name.trim()
            };

            const existingEmployeesStr = localStorage.getItem('employees') || '[]';
            let existingEmployees = JSON.parse(existingEmployeesStr);

            const emailExists = existingEmployees.some((emp: Employee) =>
                emp.email === newEmployee.email && (!editingEmployee || emp.id !== editingEmployee.id)
            );

            if (emailExists) {
                setError('Bu e-posta adresi zaten kullanımda');
                return;
            }

            let updatedEmployees;
            if (editingEmployee) {
                updatedEmployees = existingEmployees.map((emp: Employee) =>
                    emp.id === editingEmployee.id ? newEmployee : emp
                );
            } else {
                updatedEmployees = [...existingEmployees, newEmployee];
            }

            localStorage.setItem('employees', JSON.stringify(updatedEmployees));

            setEmployees(updatedEmployees);
            setIsModalOpen(false);
            setEditingEmployee(null);
            setError('');
        }
    };

    useEffect(() => {
        const employeesData = localStorage.getItem('employees');
        if (employeesData) {
            const parsedEmployees = JSON.parse(employeesData);
            setEmployees(parsedEmployees);
        }
    }, []);

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Çalışanlar</h1>
                    <button
                        onClick={() => {
                            setEditingEmployee(null);
                            setIsModalOpen(true);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                        Yeni Çalışan
                    </button>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ad Soyad
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    E-posta
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Telefon
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Durum
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">İşlemler</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {employees.map((employee) => (
                                                <tr key={employee.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {employee.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {employee.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {employee.phoneNumber}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === 'active'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {employee.status === 'active' ? 'Aktif' : 'Pasif'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => {
                                                                setEditingEmployee(employee);
                                                                setIsModalOpen(true);
                                                            }}
                                                            className="text-purple-600 hover:text-purple-900 mr-4"
                                                        >
                                                            <FaEdit className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEmployee(employee.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <FaTrash className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EmployeeModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingEmployee(null);
                }}
                onSubmit={handleSubmit}
                editData={editingEmployee || undefined}
            />
        </div>
    );
} 