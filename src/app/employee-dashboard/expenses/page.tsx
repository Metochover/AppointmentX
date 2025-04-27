'use client';

import React, { useState, useEffect } from 'react';

interface Expense {
    id: number;
    startDate: string;
    endDate: string;
    category: string;
    employee: string;
    description: string;
    amount: number;
    commissionRate: number;
    commissionAmount: number;
    employeeAmount: number;
    ownerAmount: number;
}

const categories = [
    'Ürün Satışı',
    'Hizmet',
    'Kira',
    'Fatura',
    'Diğer',
];

const employees = [
    'Ahmet Yılmaz',
    'Ayşe Demir',
    'Mehmet Kaya',
    'Fatma Şahin',
    'Zeynep Güneş',
];

export default function EmployeeExpensesPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        category: categories[0],
        employee: employees[0],
        description: '',
        amount: 0,
        commissionRate: 0,
    });
    const [userRole, setUserRole] = useState<'owner' | 'employee'>('employee');
    const [currentUserName, setCurrentUserName] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('currentUser');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    setUserRole(user.role === 'owner' ? 'owner' : 'employee');
                    setCurrentUserName(user.name || '');
                    setFormData(prev => ({ ...prev, employee: user.name || '' }));
                } catch { }
            }
        }
    }, []);

    // Komisyon hesaplama
    const commissionAmount = (formData.amount * formData.commissionRate) / 100;
    const employeeAmount = formData.amount - commissionAmount;
    const ownerAmount = commissionAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' || name === 'commissionRate' ? Number(value) : value
        }));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            commissionRate: Number(e.target.value)
        }));
    };

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        setExpenses([
            ...expenses,
            {
                id: expenses.length + 1,
                startDate: formData.startDate,
                endDate: formData.endDate,
                category: formData.category,
                employee: currentUserName,
                description: formData.description,
                amount: formData.amount,
                commissionRate: formData.commissionRate,
                commissionAmount,
                employeeAmount,
                ownerAmount,
            },
        ]);
        setFormData({ startDate: '', endDate: '', category: categories[0], employee: currentUserName, description: '', amount: 0, commissionRate: 0 });
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-2">
            <h1 className="text-3xl font-bold mb-8 text-black">Masraflarım</h1>
            <button
                className="mb-8 bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 text-lg"
                onClick={() => setIsModalOpen(true)}
            >
                Masraf Ekle
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl relative animate-fade-in">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-black">Yeni Masraf Ekle</h2>
                        <form onSubmit={handleAddExpense} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-black mb-2">Başlangıç Tarihi</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded text-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-black mb-2">Bitiş Tarihi</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded text-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-black mb-2">Kategori</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded text-black"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-black mb-2">Çalışan</label>
                                    <input
                                        type="text"
                                        name="employee"
                                        value={currentUserName}
                                        disabled
                                        className="w-full p-2 border rounded text-black bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-black mb-2">Açıklama</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded text-black"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-black mb-2">Tutar (₺)</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded text-black"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className=" text-black mb-2 flex justify-between items-center">
                                        Komisyon Oranı
                                        <span className="ml-2 font-semibold">%{formData.commissionRate}</span>
                                    </label>
                                    <input
                                        type="range"
                                        name="commissionRate"
                                        min={0}
                                        max={100}
                                        value={formData.commissionRate}
                                        onChange={handleSliderChange}
                                        className="w-full accent-purple-600"
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded grid grid-cols-3 gap-4 text-center">
                                <div className="text-black text-sm">Komisyon Tutarı<br /><b>{commissionAmount} ₺</b></div>
                                <div className="text-black text-sm">Çalışana Kalan<br /><b>{employeeAmount} ₺</b></div>
                                <div className="text-black text-sm">İşletme Sahibine Kalan<br /><b>{ownerAmount} ₺</b></div>
                            </div>
                            <button
                                type="submit"
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full text-lg"
                            >
                                Ekle
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow mt-6 text-base">
                    <thead>
                        <tr className="bg-purple-100">
                            <th className="p-3 text-left text-black">Başlangıç</th>
                            <th className="p-3 text-left text-black">Bitiş</th>
                            <th className="p-3 text-left text-black">Kategori</th>
                            <th className="p-3 text-left text-black">Çalışan</th>
                            <th className="p-3 text-left text-black">Açıklama</th>
                            <th className="p-3 text-left text-black">Tutar (₺)</th>
                            <th className="p-3 text-left text-black">Komisyon (%)</th>
                            <th className="p-3 text-left text-black">Komisyon Tutarı</th>
                            <th className="p-3 text-left text-black">Çalışana Kalan</th>
                            <th className="p-3 text-left text-black">İşletme Sahibine Kalan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="p-3 text-black whitespace-nowrap">{expense.startDate}</td>
                                <td className="p-3 text-black whitespace-nowrap">{expense.endDate}</td>
                                <td className="p-3 text-black whitespace-nowrap">{expense.category}</td>
                                <td className="p-3 text-black whitespace-nowrap">{expense.employee}</td>
                                <td className="p-3 text-black">{expense.description}</td>
                                <td className="p-3 text-black">{expense.amount}</td>
                                <td className="p-3 text-black">{expense.commissionRate}</td>
                                <td className="p-3 text-black">{expense.commissionAmount}</td>
                                <td className="p-3 text-black">{expense.employeeAmount}</td>
                                <td className="p-3 text-black">{expense.ownerAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 