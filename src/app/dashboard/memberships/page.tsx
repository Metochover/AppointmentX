"use client";
import React, { useState } from 'react';
import { FaUserPlus, FaCalendarAlt, FaGift, FaPlus } from 'react-icons/fa';

const defaultMemberships = [
    {
        member: 'Ali Veli',
        start: '2024-03-01',
        end: '2024-06-01',
        package: '3 Aylık',
    },
    {
        member: 'Zeynep Şahin',
        start: '2024-02-15',
        end: '2024-05-15',
        package: '3 Aylık',
    },
];

export default function MembershipsPage() {
    const [memberships, setMemberships] = useState(defaultMemberships);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ member: '', start: '', end: '', package: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setMemberships([...memberships, form]);
        setForm({ member: '', start: '', end: '', package: '' });
        setShowModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
                    <FaUserPlus className="text-green-600 text-4xl" /> Üyelikler
                </h1>
                <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow transition"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Üyelik Ekle
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {memberships.map((m, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-lg flex items-start gap-5 p-5 hover:shadow-2xl transition">
                        <div className="flex flex-col items-center gap-2 min-w-[60px]">
                            <FaGift className="text-green-500 text-2xl" />
                            <span className="text-xs text-gray-500">{new Date(m.start).toLocaleDateString('tr-TR')} - {new Date(m.end).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-lg font-bold text-black mb-1 flex items-center gap-2">
                                <FaUserPlus className="text-green-600" /> {m.member}
                            </div>
                            <div className="text-black text-sm font-medium mb-1">Paket: <span className="font-normal">{m.package}</span></div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative animate-fade-in">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-black">Yeni Üyelik Ekle</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Üye Adı"
                                value={form.member}
                                onChange={e => setForm(f => ({ ...f, member: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Başlangıç Tarihi"
                                value={form.start}
                                onChange={e => setForm(f => ({ ...f, start: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Bitiş Tarihi"
                                value={form.end}
                                onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Paket"
                                value={form.package}
                                onChange={e => setForm(f => ({ ...f, package: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full text-lg mt-2"
                            >
                                Kaydet
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 