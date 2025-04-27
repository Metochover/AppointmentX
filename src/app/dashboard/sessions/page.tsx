"use client";
import React, { useState } from 'react';
import { FaUserMd, FaBook, FaPlus } from 'react-icons/fa';

const defaultSessions = [
    {
        date: '2024-04-10',
        client: 'Elif Kaya',
        topic: 'Bireysel Terapi',
        notes: 'İlk görüşme, danışanın genel durumu değerlendirildi.',
    },
    {
        date: '2024-04-15',
        client: 'Ahmet Demir',
        topic: 'Çift Terapisi',
        notes: 'Çiftler arası iletişim sorunları ele alındı.',
    },
];

export default function SessionsPage() {
    const [sessions, setSessions] = useState(defaultSessions);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ date: '', client: '', topic: '', notes: '' });
    const [filterName, setFilterName] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        setSessions([...sessions, form]);
        setForm({ date: '', client: '', topic: '', notes: '' });
        setShowModal(false);
    };

    const filteredSessions = sessions.filter(s => {
        const nameMatch = s.client.toLowerCase().includes(filterName.toLowerCase());
        const sessionDate = new Date(s.date);
        const startDate = filterStartDate ? new Date(filterStartDate) : null;
        const endDate = filterEndDate ? new Date(filterEndDate) : null;
        const dateMatch =
            (!startDate || sessionDate >= startDate) &&
            (!endDate || sessionDate <= endDate);
        return nameMatch && dateMatch;
    });

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
                    <FaBook className="text-pink-600 text-4xl" /> Seans Notları
                </h1>
                <button
                    className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded shadow transition"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Not Ekle
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Danışan adına göre filtrele"
                    value={filterName}
                    onChange={e => setFilterName(e.target.value)}
                    className="w-full md:w-1/3 p-2 border rounded text-black bg-gray-50"
                />
                <input
                    type="date"
                    placeholder="Başlangıç tarihi"
                    value={filterStartDate}
                    onChange={e => setFilterStartDate(e.target.value)}
                    className="w-full md:w-1/3 p-2 border rounded text-black bg-gray-50"
                />
                <input
                    type="date"
                    placeholder="Bitiş tarihi"
                    value={filterEndDate}
                    onChange={e => setFilterEndDate(e.target.value)}
                    className="w-full md:w-1/3 p-2 border rounded text-black bg-gray-50"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSessions.map((s, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-lg flex items-start gap-5 p-5 hover:shadow-2xl transition">
                        <div className="flex flex-col items-center gap-2 min-w-[60px]">
                            <FaUserMd className="text-pink-500 text-2xl" />
                            <span className="text-xs text-gray-500">{new Date(s.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-lg font-bold text-black mb-1 flex items-center gap-2">
                                {s.client}
                            </div>
                            <div className="text-black text-sm font-medium mb-1">Konu: <span className="font-normal">{s.topic}</span></div>
                            <div className="text-black text-sm font-medium">Notlar: <span className="font-normal">{s.notes}</span></div>
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
                        <h2 className="text-2xl font-semibold mb-6 text-black">Yeni Seans Notu</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input
                                type="date"
                                placeholder="Tarih"
                                value={form.date}
                                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Danışan Adı"
                                value={form.client}
                                onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Konu"
                                value={form.topic}
                                onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                            />
                            <textarea
                                placeholder="Notlar"
                                value={form.notes}
                                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                                className="w-full p-2 border rounded text-black bg-gray-50"
                                required
                                rows={3}
                            />
                            <button
                                type="submit"
                                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full text-lg mt-2"
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